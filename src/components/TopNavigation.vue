<script lang="ts">
  import { defineComponent, onBeforeUnmount, onMounted, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import useSticky from '~/features/sticky'

  export default defineComponent({
    props: {
      includeBackButton: Boolean,
    },
    setup: (props) => {
      const router = useRouter()

      return {
        router,
        ...useSticky(),
      }
    },
  })
</script>

<template>
  <nav
    class="[ top-navigation sticky ] [ max-width-wrapper extra-wide-wrapper ]"
  >
    <div class="left">
      <slot name="left">
        <button
          v-if="includeBackButton"
          class="[ btn icon-btn icon-only ]"
          @click="router.back()"
        >
          <ion-arrow-back-sharp />
        </button>
      </slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </nav>
</template>

<style scoped>
  .top-navigation {
    position: sticky;
    z-index: 1000;
    top: -1px;
    display: flex;
    height: 3rem;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    background: transparent;
  }

  .isSticky {
    /* background-color: #111d2a; */
    background-color: var(--primary);
  }

  .left {
    justify-self: flex-start;
  }

  .right {
    justify-self: flex-end;
  }

  @media all and (min-width: 800px) {
    .top-navigation {
      height: 4rem;
    }

    .isSticky {
      background-color: transparent;
    }
  }
</style>
