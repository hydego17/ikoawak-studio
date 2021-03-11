// /deskStructure.js
import S from '@sanity/desk-tool/structure-builder';

export default () =>
  S.list()
    .title('Content')
    .items([
      ...S.documentTypeListItems().filter(
        (listItem) => !['home', 'about'].includes(listItem.getId())
      ),
      S.listItem()
        .title('Filtered Posts')
        .child(
          S.list()
            .title('Filters')
            .items([
              S.listItem()
                .title('Posts By Category')
                .child(
                  S.documentTypeList('category')
                    .title('Posts by Category')
                    .child((categoryId) =>
                      S.documentList()
                        .title('Posts')
                        .filter(
                          '_type == "post" && $categoryId in categories[]._ref'
                        )
                        .params({ categoryId })
                    )
                ),
              S.listItem()
                .title('Posts By Author')
                .child(
                  S.documentTypeList('author')
                    .title('Posts by Author')
                    .child((authorId) =>
                      S.documentList()
                        .title('Posts')
                        .filter('_type == "post" && $authorId == author._ref')
                        .params({ authorId })
                    )
                ),
            ])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter((listItem) =>
        ['home', 'about'].includes(listItem.getId())
      ),
    ]);
