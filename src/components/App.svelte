<script>
  import Router from "svelte-spa-router";
  import Header from "./parts/Header/Header.svelte";
  import routes from "./routes";
</script>

<Header />
<Router {routes} />
