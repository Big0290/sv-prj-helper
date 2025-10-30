<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Pagination from './Pagination.svelte'

  const { Story } = defineMeta({
    title: 'Molecules/Pagination',
    component: Pagination,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'A pagination component for navigating through pages of content.',
        },
      },
    },
  })
</script>

<Story name="FirstPage" args={{ currentPage: 1, totalPages: 10 }} />

<Story name="MiddlePages" args={{ currentPage: 5, totalPages: 20 }} />

<Story name="LastPage" args={{ currentPage: 10, totalPages: 10 }} />

<Story name="FewPages" args={{ currentPage: 2, totalPages: 3 }} />

<Story name="WithoutFirstLast" args={{ currentPage: 15, totalPages: 30, showFirstLast: false }} />

<Story name="ManyPages" args={{ currentPage: 50, totalPages: 100, maxVisible: 5 }} />
