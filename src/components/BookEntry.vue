<script lang="ts">
  import { defineComponent, PropType, computed, toRefs, reactive } from 'vue'
  import { BookEntry } from '~/types/index'
  import { format, parseISO } from 'date-fns'

  export default defineComponent({
    props: {
      entry: { type: Object as PropType<BookEntry>, required: true },
    },
    setup: (props) => {
      const { entry } = toRefs(props)
      const state = reactive({
        authors: computed(() => {
          return entry.value.book.authors.join(', ')
        }),
        entryDate: {
          dayOfWeek: computed(() => {
            return format(parseISO(entry.value.date), 'eee')
          }),
          day: computed(() => {
            return format(parseISO(entry.value.date), 'd')
          }),
        },
      })

      return {
        ...toRefs(state),
      }
    },
  })
</script>

<template>
  <div class="entry">
    <div class="entry-details">
      <div class="entry-date">
        <div class="day-of-week">
          {{ entryDate.dayOfWeek }}
        </div>
        <div class="day">
          {{ entryDate.day }}
        </div>
      </div>
      <div class="book-info">
        <h2 class="title">
          {{ entry.book.title }}
        </h2>
        <h4 class="author">
          {{ authors }}
        </h4>
        <p>{{ entry.pages }} Pages</p>
      </div>
      <div class="edit">
        <button class="[ btn icon-btn icon-only ]" title="Edit Entry">
          <bx-bx-edit />
        </button>
      </div>
      <div class="time-read">{{ entry.minutes }} min</div>
    </div>
  </div>
</template>

<style scoped>
  .entry {
    position: relative;
    display: block;
    overflow: hidden;
    width: 100%;
    height: 100px;
    min-height: 75px;
    padding: 0.5rem 1rem;
    background: var(--secondary);
    border-radius: 0.5rem;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  }

  .entry-details {
    display: grid;
    height: 100%;
    grid-template-areas:
      'date book edit'
      '. book time';
    grid-template-columns: min-content 1fr max-content;
    grid-template-rows: 1fr 1fr;
  }

  .entry-date {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 1rem;
    color: var(--white);
    grid-area: date;
    text-align: center;
  }

  .entry-date .day-of-week {
    opacity: 0.7;
  }

  .entry-date .day {
    font-weight: 700;
  }

  .book-info {
    color: var(--white);
    grid-area: book;
  }

  .book-info .title {
    color: var(--accent-1);
    font-size: 1.25rem;
  }

  .book-info .author {
    color: var(--white);
    font-size: 0.875rem;
  }

  .edit {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    grid-area: edit;
  }

  .time-read {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    color: var(--white);
    grid-area: time;
  }
</style>
