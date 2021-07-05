<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    setup: () => {
      return {}
    },
  })
</script>

<template>
  <nav
    id="site-navigation"
    role="navigation"
    class="site-nav"
    aria-label="Main"
  >
    <div class="site-nav-menu">
      <ul class="menu">
        <li class="menu-item">
          <router-link class="nav-btn" to="/" title="Log">
            <ph-clock-clockwise class="icon" />
            <br />
            <span>Log</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link class="nav-btn" to="/library" title="Library">
            <clarity-library-line class="icon" />
            <br />
            <span>Library</span>
          </router-link>
        </li>
        <!-- <li class="menu-item">
          <router-link class="nav-btn" to="/books/add" title="Add Book">
            <carbon-add-alt class="icon" />
            Add Book
          </router-link>
        </li> -->
        <li class="menu-item">
          <router-link class="nav-btn" to="/statistics" title="Stats">
            <gridicons-stats class="icon" />
            <br />
            <span>Stats</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link class="nav-btn" to="/settings" title="Settings">
            <carbon-settings class="icon" />
            <br />
            <span>Settings</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
  .site-nav {
    position: fixed;
    z-index: 1000;
    bottom: 0;
    display: flex;
    width: 100%;
    height: 5rem;
    align-items: center;
    padding-bottom: 1.75rem;
    /* background-color: var(--black); */
    background-color: #111d2a;
    box-shadow: rgb(0 0 0 / 10%) 0px -10px 10px;
    color: var(--white);
    font-size: 10px;
    line-height: 1;
    text-align: center;
  }

  .site-nav-menu {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .menu {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .menu-item {
    display: flex;
    width: 25%;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1rem;
  }

  .nav-btn {
    display: block;
    width: 100%;
    font-size: 0.875rem;
    font-weight: 700;
    opacity: 0.7;
    text-align: center;
    transition-duration: 100ms;
    transition-property: border-color;
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }

  .nav-btn svg {
    font-size: 1.2rem;
  }

  .nav-btn:hover,
  .router-link-active.nav-btn {
    opacity: 1;
  }

  @media all and (min-width: 800px) {
    .site-nav {
      position: sticky;
      top: 0;
      left: 0;
      max-width: max-content;
      height: 100vh;
      align-items: flex-start;
      padding: 2rem 0;
      border-radius: 0;
      box-shadow: rgb(0 0 0 / 10%) 10px 0 10px;
    }

    .site-nav-menu {
      width: auto;
    }

    .menu {
      flex-direction: column;
    }

    .menu-item {
      width: auto;
    }

    .nav-btn {
      width: auto;
      font-size: 1rem;
    }
  }
</style>
