<script lang="ts">
  import { defineComponent, reactive } from 'vue'
  import { Book } from '~/types/index'

  export default defineComponent({
    props: {
      active: Boolean,
    },
    emits: ['close'],
    setup: (props) => {
      let book: Book = reactive({
        title: '',
        authors: [],
        isbns: [],
        page_count: 0,
        thumbnail: '',
      })

      const addAuthor = (e: Event) => {
        e.preventDefault()
        const target = e.target as HTMLInputElement
        if (target) {
          let val = target.value.trim()
          if (val.length > 0) {
            book.authors.push(val)
            target.value = ''
          }
        }
      }

      const removeAuthor = (index: number) => {
        book.authors.splice(index, 1)
      }

      const removeLastAuthor = (e: Event) => {
        if ((e.target as HTMLInputElement).value.length === 0) {
          removeAuthor(book.authors.length - 1)
        }
      }

      const addIsbn = (e: Event) => {
        e.preventDefault()
        const target = e.target as HTMLInputElement
        if (target) {
          let val = target.value.trim()
          if (val.length > 0) {
            book.isbns.push(val)
            target.value = ''
          }
        }
      }

      const removeIsbn = (index: number) => {
        book.isbns.splice(index, 1)
      }

      const removeLastIsbn = (e: Event) => {
        if ((e.target as HTMLInputElement).value.length === 0) {
          removeAuthor(book.isbns.length - 1)
        }
      }

      return {
        book,
        addAuthor,
        removeAuthor,
        removeLastAuthor,
        addIsbn,
        removeIsbn,
        removeLastIsbn,
      }
    },
  })
</script>
<template>
  <div class="add-book" :data-state="active ? 'open' : 'closed'">
    <div class="[ add-book-wrapper ] [ max-width-wrapper ]">
      <button type="button" @click="$emit('close')" class="[ btn close ]">
        <ant-design-close-square-outlined class="icon" />
        <span class="btn-label">CLOSE</span>
      </button>
      <form class="add-book-form">
        <h2 class="heading">Add Book</h2>
        <div class="inputs">
          <label for="title" class="input-box">
            <span class="field-name">* Title</span>
            <input
              id="title"
              type="text"
              name="book title"
              :required="true"
              v-model="book.title"
            />
          </label>
          <label for="authors" class="input-box">
            <span class="field-name">* Author(s)</span>
            <div class="list-input">
              <div
                class="input-item"
                v-for="(author, index) in book.authors"
                :key="index"
              >
                <button
                  type="button"
                  class="added"
                  @click="removeAuthor(index)"
                  :aria-label="`Remove ${author}`"
                >
                  x
                </button>
                {{ author }}
              </div>
              <input
                id="authors"
                type="text"
                name="book author(s)"
                :required="true"
                @keydown.enter="addAuthor"
                @keydown.188="addAuthor"
                @keydown.delete="removeLastAuthor"
              />
            </div>
          </label>
          <label for="isbns" class="input-box">
            <span class="field-name">* ISBN(s) (10/13)</span>
            <div class="list-input">
              <div
                class="input-item"
                v-for="(isbn, index) in book.isbns"
                :key="index"
              >
                <button
                  type="button"
                  class="added"
                  @click="removeIsbn(index)"
                  :aria-label="`Remove ${isbn}`"
                >
                  x
                </button>
                {{ isbn }}
              </div>
              <input
                id="isbns"
                type="text"
                name="isbn(s)"
                :required="true"
                @keydown.enter="addIsbn"
                @keydown.188="addIsbn"
                @keydown.delete="removeLastIsbn"
              />
            </div>
          </label>
          <label for="pageCount" class="input-box">
            <span class="field-name">* Page Count</span>
            <input
              id="pageCount"
              type="text"
              name="page count"
              :required="true"
              v-model="book.page_count"
            />
          </label>
          <label for="thumbnail" class="input-box">
            <span class="field-name">Thumbnail</span>
            <input
              id="thumbnail"
              type="text"
              name="thumbnail"
              v-model="book.thumbnail"
            />
          </label>
        </div>
        <div class="thumbnail">
          <img
            v-show="book.thumbnail"
            class="book-cover"
            :src="book.thumbnail"
            alt="book thumbnail"
          />
        </div>
        <button class="submit-btn" type="submit">Add</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
  .add-book {
    position: fixed;
    top: -200%;
    right: 0;
    left: 0;
    overflow: auto;
    /* background-color: var(--primary); */
    background: linear-gradient(var(--primary), var(--secondary));
    opacity: 0;
    -webkit-overflow-scrolling: touch;
    transform: translate3d(0, -100%, 0);
    transition: transform 0.2s, top 0s ease 0.2s, bottom 0s ease 0.2s,
      left 0s ease 0.2s, opacity 0.25s;
  }

  .add-book[data-state='open'] {
    z-index: 1100;
    top: 0;
    bottom: 0;
    left: 0;
    opacity: 1;
    transform: translateZ(0);
    transition: transform 0.25s, top 0s, bottom 0s, left 0s, opacity 0s;
  }

  .add-book-wrapper {
    position: relative;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .btn.close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0;
    background-color: transparent;
    color: var(--white);
    font-size: 1.5rem;
  }

  .btn.close .btn-label {
    display: none;
  }

  .add-book-form {
    display: grid;
    padding: 2rem 1rem 1rem;
    grid-template-areas: 'heading' 'thumbnail' 'inputs' 'buttons';
    row-gap: 1rem;
  }

  .add-book-form .inputs {
    grid-area: inputs;
  }

  .add-book-form .heading {
    color: var(--white);
    grid-area: heading;
    text-align: center;
  }

  .add-book-form .inputs .input-box {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0;
  }

  .add-book-form .inputs .input-box .input-item {
    display: inline-block;
    padding: 0 0.5rem;
    margin-right: 0.5rem;
    margin-bottom: 0.25rem;
    background-color: var(--accent-1);
    color: var(--primary);
  }

  .add-book-form .inputs .input-box .input-item .added {
    padding: 0;
    border: none;
    margin-right: 0.25rem;
    appearance: none;
    background-color: var(--accent-1);
    color: var(--primary);
    cursor: pointer;
    opacity: 0.75;
  }

  .add-book-form .inputs .input-box .field-name {
    color: var(--accent-1);
  }

  .add-book-form .inputs .input-box input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #fff;
    background: transparent;
    color: #fff;
    font-size: 16px;
    outline: none;
  }

  .thumbnail {
    position: relative;
    display: block;
    overflow: hidden;
    width: 100%;
    max-width: 400px;
    min-height: 300px;
    margin: 0 auto;
    background: linear-gradient(
      to bottom,
      #243b55 0%,
      var(--black) 60%,
      var(--black) 100%
    );
    background-blend-mode: multiply;
    border-radius: 0.5rem;
    grid-area: thumbnail;
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

  .submit-btn {
    grid-area: buttons;
  }

  @media all and (min-width: 800px) {
    .add-book-form {
      column-gap: 2rem;
      grid-template-areas:
        'heading heading'
        'inputs thumbnail'
        'buttons buttons';
      grid-template-columns: repeat(2, minmax(0, 50%));
    }

    .btn.close {
      padding: 0.25rem 1rem;
      background-color: var(--accent-1);
      color: var(--primary);
      font-size: 1.25rem;
    }

    .btn.close .icon {
      display: none;
    }
    .btn.close .btn-label {
      display: inline-block;
    }
  }
</style>
