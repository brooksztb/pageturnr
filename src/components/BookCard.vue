<script lang="ts">
  import { defineComponent, PropType, computed, toRefs } from 'vue'
  import { Book } from '~/types/index'
  import { slugify } from '~/utils/slugify'

  export default defineComponent({
    props: {
      book: { type: Object as PropType<Book>, required: true },
    },
    setup: (props) => {
      const { book } = toRefs(props)

      const authors = computed(() => {
        return book.value.authors.join(', ')
      })

      const bookUrl = computed(() => {
        let text = `${book.value.title} ${book.value.authors.join(', ')}`
        return `/library/${slugify(text)}`
      })

      return {
        authors,
        bookUrl,
      }
    },
  })
</script>

<template>
  <div class="book-card" :style="{ backgroundImage: `url(${book.thumbnail})` }">
    <div class="book-cover-overlay">
      <!-- <img class="book-cover" :src="book.thumbnail" alt="book cover" /> -->
    </div>
    <div class="book-details">
      <div class="book-info">
        <h2 class="title">
          {{ book.title }}
        </h2>
        <h4 class="author">
          {{ authors }}
        </h4>
        <div class="book-stats">
          <span class="pages-read">
            Pages
            <!-- {{ completedPages }}/{{ book.page_count }} Pages -->
          </span>
          <div>
            <span class="completion">
              %
              <!-- {{ completionPercentage }}% -->
            </span>
            <!-- <fa
              v-if="isCompleted"
              class="text-accent-3"
              :icon="['fas', 'book']"
            />
            <fa
              v-if="isReading"
              class="text-accent-1"
              :icon="['fas', 'bookOpen']"
            /> -->
          </div>
        </div>
      </div>
      <div>
        <span></span>
      </div>
      <div class="controls">
        <!-- <router-link class="btn" :to="bookUrl" role="button"
          >View Book Info</router-link
        > -->
      </div>
    </div>
  </div>
</template>

<style scoped>
  .book-card {
    position: relative;
    display: block;
    overflow: hidden;
    width: 100%;
    height: 400px;
    min-height: 300px;
    margin: 1rem 0;
    background-position: 50% 0;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 0.5rem;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  }

  .book-cover-overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background: linear-gradient(
      to bottom,
      rgba(36, 59, 85, 0.4) 0%,
      #111d2a 60%,
      #111d2a 100%
    ); */
    background: linear-gradient(
      to bottom,
      rgba(36, 59, 85, 0.4) 0%,
      #000000 65%,
      #000000 100%
    );
    background-blend-mode: multiply;
  }

  /* .book-cover {
    position: absolute;
    z-index: 0;
    top: 50%;
    left: 50%;
    display: inline-block;
    width: auto;
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    transform: translateX(-50%) translateY(-50%);
  }

  @supports (object-fit: cover) {
    .book-cover {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      transform: none;
    }
  } */

  .book-details {
    position: relative;
    z-index: 10;
    display: flex;
    width: 100%;
    max-width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    padding-top: 8rem;
  }

  .book-info {
    width: 100%;
    margin-bottom: 2rem;
  }

  .book-info .title {
    color: var(--accent-1);
    font-size: 2.25rem;
  }

  .book-info .author {
    color: var(--white);
    font-size: 1.5rem;
  }

  .book-stats {
    display: flex;
    justify-content: space-between;
  }

  .book-stats .pages-read,
  .book-stats .completion {
    color: var(--white);
    font-size: 1.25rem;
    opacity: 0.75;
  }

  .book-details .controls {
    display: flex;
    width: full;
    align-items: flex-end;
  }
</style>
