<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import UserProfile from './UserProfile.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Chat/UserProfile',
    component: UserProfile,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of UserProfile component.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
