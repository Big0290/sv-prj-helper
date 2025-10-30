<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Snackbar from './Snackbar.svelte'

  const { Story } = defineMeta({
    title: 'Molecules/Snackbar',
    component: Snackbar,
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
      docs: {
        description: {
          component: 'A snackbar component for displaying brief notifications with optional actions.',
        },
      },
    },
  })
</script>

<Story name="Default" args={{ isOpen: true, message: 'This is a default snackbar' }} />

<Story name="Success" args={{ isOpen: true, message: 'Operation completed successfully!', variant: 'success' }} />

<Story name="Warning" args={{ isOpen: true, message: 'Please review your changes', variant: 'warning' }} />

<Story name="Error" args={{ isOpen: true, message: 'Something went wrong', variant: 'error' }} />

<Story name="Info" args={{ isOpen: true, message: 'New feature available!', variant: 'info' }} />

<Story name="TopPosition" args={{ isOpen: true, message: 'Top snackbar', position: 'top' }} />

<Story name="BottomRight" args={{ isOpen: true, message: 'Bottom right position', position: 'bottom-right' }} />
