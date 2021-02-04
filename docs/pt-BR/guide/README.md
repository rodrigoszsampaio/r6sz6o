# Introdução

O VuePress é composto de duas partes: um [gerador de site estático minimalista](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/core) with a Vue-powered [theming system](https://v1.vuepress.vuejs.org/theme/) and [Plugin API](https://v1.vuepress.vuejs.org/plugin/), and a [default theme](https://v1.vuepress.vuejs.org/theme/default-theme-config.html) optimized for writing technical documentation. It was created to support the documentation needs of Vue's own sub projects.

Cada página gerada pelo VuePress tem seu próprio HTML estático pré-renderizado, proporcionando um ótimo desempenho de carregamento e é compatível com SEO. Assim que a página é carregada, no entanto, o Vue assume o conteúdo estático e o transforma em um aplicativo de página única (SPA) completo. Páginas adicionais são buscadas sob demanda, conforme o usuário navega pelo site.
