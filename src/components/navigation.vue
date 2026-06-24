<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
    hide-overlay
    stateless
    dark
  >
    <v-toolbar flat class="transparent ">
      <v-list class="pa-0">
        <v-list-item>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn
              icon
              @click.stop="mini = !mini"
            >
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list dense class="pt-0">

      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="{name: item.link}"
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-group
        prepend-icon="account_circle"
        value="true"
      >
        <template v-slot:activator>
          <v-list-item>
            <v-list-item-title>Reportes</v-list-item-title>
          </v-list-item>
        </template>

        <v-list-item
          v-for="item in reports"
          :key="item.title"
          :to="{name: item.link}"
        >
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <v-list-item-action>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data () {
    return {
      drawer: true,
      items: [
        { title: 'Entidad', icon: 'dashboard', link: 'entidad' },
        { title: 'Programa', icon: 'dashboard', link: 'programa' },
        { title: 'Iniciativas', icon: 'question_answer', link: 'perfil' }
      ],
      reports: [
        { title: 'Indicadores', icon: 'dashboard', link: 'perfil' },
        { title: 'Inversión', icon: 'dashboard', link: 'perfil' },
        { title: 'Tipo de inversión', icon: 'dashboard', link: 'perfil' }
      ],
      mini: true,
      right: null
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
