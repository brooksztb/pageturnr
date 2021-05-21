<script setup lang="ts">
  import { isDark, toggleDark } from '~/logic'
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
          <router-link class="nav-btn" to="/" title="Home">
            <carbon-home class="icon" />
            Home
          </router-link>
        </li>
        <li class="menu-item">
          <router-link class="nav-btn" to="/books" title="Books">
            <bx-bx-book-bookmark class="icon" />
            Books
          </router-link>
        </li>
        <li class="menu-item">
          <router-link class="nav-btn" to="/settings" title="Settings">
            <carbon-settings class="icon" />
            Settings
          </router-link>
        </li>
      </ul>
    </div>
    <a class="icon-btn" title="Toggle Dark Mode" @click="toggleDark">
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </a>
  </nav>
</template>

<style scoped>
  .site-nav {
    position: fixed;
    z-index: 1000;
    bottom: 0;
    display: flex;
    width: 100%;
    height: 4rem;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;
    background-color: var(--secondary);
    border-top-left-radius: 0.375rem;
    border-top-right-radius: 0.375rem;
    color: var(--primary);
  }

  .site-nav-menu {
    position: relative;
    width: 100%;
  }

  .menu {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .menu-item {
    display: flex;
    width: 33.333%;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .nav-btn {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid transparent;
    font-size: 0.875rem;
    text-align: center;
    transition-duration: 100ms;
    transition-property: border-color;
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }

  .nav-btn:hover {
    border-color: var(--secondary);
    opacity: 1;
  }

  @media all and (min-width: 800px) {
    .site-nav {
      position: relative;
      z-index: 0;
      height: 100%;
      padding: 0;
      margin-top: 1rem;
      background-color: transparent;
      border-radius: none;
      color: var(--white);
    }

    .site-nav-menu {
      width: auto;
    }

    .menu {
      flex-wrap: wrap;
    }

    .menu-item {
      width: auto;
    }

    .nav-btn {
      width: auto;
      font-size: 1rem;
      opacity: 0.75;
    }

    .nav-btn .icon {
      display: none;
    }
  }
</style>
