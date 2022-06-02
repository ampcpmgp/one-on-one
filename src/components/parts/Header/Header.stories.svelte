<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Header from "./Header.svelte";
</script>

<Meta
  title="Header"
  component={Header}
  argTypes={{
    label: { control: "text" },
    primary: { control: "boolean" },
    backgroundColor: { control: "color" },
    size: {
      control: { type: "select", options: ["small", "medium", "large"] },
    },
    onClick: { action: "onClick" },
  }}
/>

<Template let:args>
  <Header {...args} on:click={args.onClick} />
</Template>

<Story name="Text" args={{ text: "Text" }} />

<Story name="Emoji" args={{ text: "😀 😎 👍 💯" }} />
