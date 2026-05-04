import { StructureBuilder } from 'sanity/structure'
import {
  FolderIcon,
  BookIcon,
  PackageIcon,
  ProjectsIcon,
} from '@sanity/icons'

const CATEGORIES = [
  { title: 'Indoor',              value: 'indoor' },
  { title: 'Facade',              value: 'facade' },
  { title: 'Landscape',           value: 'landscape' },
  { title: 'Speciality Products', value: 'speciality products' },
]

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Arclumi')
    .items([

      /* ── PROJECTS ── */
      S.listItem()
        .title('Projects')
        .icon(ProjectsIcon)
        .child(
          S.documentTypeList('project')
            .title('All Projects')
        ),

      S.divider(),

      /* ── PRODUCTS ── */
      S.listItem()
        .title('Products')
        .icon(FolderIcon)
        .child(
          S.list()
            .title('Products by Category')
            .items(
              CATEGORIES.map((cat) =>
                S.listItem()
                  .title(cat.title)
                  .icon(BookIcon)
                  .child(
                    /* Show catalogues filtered to this category */
                    S.documentList()
                      .title(`${cat.title} Catalogues`)
                      .filter('_type == "catalogue" && category == $category')
                      .params({ category: cat.value })
                      .child((catalogueId) =>
                        /* Open catalogue with its products inline */
                        S.document()
                          .documentId(catalogueId)
                          .schemaType('catalogue')
                          .views([
                            S.view.form().title('Catalogue & Products'),
                          ])
                      )
                  )
              )
            )
        ),

    ])
