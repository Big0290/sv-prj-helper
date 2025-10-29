<script lang="ts">
  import { Alert, Stack } from '$lib/ui'
</script>

<Stack gap="3">
  <Alert variant="success" dismissible>Profile updated successfully!</Alert>

  <Alert variant="error" dismissible>Failed to save changes. Please try again.</Alert>

  <Alert variant="info">New features are available in the latest update.</Alert>
</Stack>
