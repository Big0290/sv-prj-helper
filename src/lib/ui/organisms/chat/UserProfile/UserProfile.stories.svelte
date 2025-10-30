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

<Story name="Default">
  <UserProfile>Default UserProfile</UserProfile>
</Story>

<Story name="Variation 1">
  <UserProfile>Variation 1</UserProfile>
</Story>

<Story name="Variation 2">
  <UserProfile>Variation 2</UserProfile>
</Story>
