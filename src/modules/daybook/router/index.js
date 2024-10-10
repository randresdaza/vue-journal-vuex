export default {
  path: "/",
  name: "daybook",
  redirect: { name: "no-entry" },
  component: () =>
    import(
      /* webpackChunkName: "daybook" */ "@/modules/daybook/layouts/DayBookLayout.vue"
    ),
  children: [
    {
      path: "/daybook",
      name: "no-entry",
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ "@/modules/daybook/views/NoEntrySelected.vue"
        ),
    },
    {
      path: "/daybook/:id",
      name: "entry",
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ "@/modules/daybook/views/EntryView.vue"
        ),
      props: (route) => {
        return {
          id: route.params.id,
        };
      },
    },
  ],
};
