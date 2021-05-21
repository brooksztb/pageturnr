<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      book: Object,
    },
    setup: (props) => {
      return {}
    },
  })
</script>

<template>
  <div class="book-card">
    <!-- <img class="book-cover" :src="book.thumbnail" alt="book cover" /> -->
    <img class="book-cover" alt="book cover" />
    <div class="book-details">
      <div class="book-info">
        <h2 class="title">
          <!-- {{ book.title }} -->
        </h2>
        <h4 class="author">
          <!-- {{ authors }} -->
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
        <!-- <router-link
          class="btn"
          :to="bookUrl"
          role="button"
          >View Book Info</router-link
        > -->
        <router-link class="btn" to="/books">View Book Info</router-link>
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
    border-radius: 0.5rem;
    /* box-shadow:  */
  }

  .book-cover {
    position: absolute;
    z-index: 0;
    top: 50%;
    left: 50%;
    display: inline-block;
    width: auto;
    max-width: 100%;
    height: auto;
    background: linear-gradient(
      to bottom,
      rgba(245, 154, 0, 0.2) 0%,
      var(--black) 60%,
      var(--black) 100%
    );
    background-blend-mode: multiply;
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
  }

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
    color: var(--secondary);
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
