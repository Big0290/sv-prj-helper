<script lang="ts">
  import { Card, Badge, Stack, Text, Flex } from '$lib/ui'
</script>

<Card>
  <Stack gap="2">
    <Flex justify="space-between" align="center">
      <Text weight="bold">Total Revenue</Text>
      <Badge variant="success">Active</Badge>
    </Flex>
    <Text size="xl" weight="bold">$45,231</Text>
    <Text size="sm" color="var(--text-secondary)">+20.1% from last month</Text>
  </Stack>
</Card>
