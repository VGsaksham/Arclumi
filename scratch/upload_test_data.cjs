const fs = require('fs')
const path = require('path')
const {createClient} = require('@sanity/client')

// Using the same config as the app
const client = createClient({
  projectId: 'ze3x4nh7',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-24',
  token: process.env.SANITY_AUTH_TOKEN // Hopefully this is available in the environment or I can find another way
})

const productsDir = path.join(__dirname, '..', 'public', 'products')

async function uploadImages() {
  const files = fs.readdirSync(productsDir)
  const imageAssets = []

  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg')) {
      console.log(`Uploading ${file}...`)
      const filePath = path.join(productsDir, file)
      const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
        filename: file
      })
      imageAssets.push({
        name: file.replace('.png', '').replace('.jpg', ''),
        asset: asset
      })
    }
  }
  return imageAssets
}

async function run() {
  try {
    const assets = await uploadImages()
    console.log(`Uploaded ${assets.length} images.`)

    // Create a few catalogues
    const catalogues = [
      {
        title: 'Modern Minimalist',
        category: 'indoor',
        desc: 'Sleek and subtle indoor lighting solutions for modern spaces.',
        products: assets.slice(0, 5).map(a => ({
          _key: Math.random().toString(36).substr(2, 9),
          _type: 'product',
          name: a.name,
          images: [{_type: 'image', asset: {_type: 'reference', _ref: a.asset._id}}],
          specs: '12W / 3000K / High CRI'
        }))
      },
      {
        title: 'Architectural Facade',
        category: 'facade',
        desc: 'Powerful outdoor lighting designed to highlight building features.',
        products: assets.slice(5, 10).map(a => ({
          _key: Math.random().toString(36).substr(2, 9),
          _type: 'product',
          name: a.name,
          images: [{_type: 'image', asset: {_type: 'reference', _ref: a.asset._id}}],
          specs: '24W / 4000K / IP65'
        }))
      },
      {
        title: 'Garden Glow',
        category: 'landscape',
        desc: 'Subtle landscape lighting to transform your outdoor areas at night.',
        products: assets.slice(10).map(a => ({
          _key: Math.random().toString(36).substr(2, 9),
          _type: 'product',
          name: a.name,
          images: [{_type: 'image', asset: {_type: 'reference', _ref: a.asset._id}}],
          specs: '5W / 2700K / Landscape grade'
        }))
      }
    ]

    for (const cat of catalogues) {
      console.log(`Creating catalogue: ${cat.title}`)
      await client.create({
        _type: 'catalogue',
        title: cat.title,
        category: cat.category,
        desc: cat.desc,
        slug: { _type: 'slug', current: cat.title.toLowerCase().replace(/ /g, '-') },
        images: cat.products[0].images, // Use first product image as thumbnail
        products: cat.products
      })
    }

    console.log('Done!')
  } catch (err) {
    console.error('Error:', err)
  }
}

run()
