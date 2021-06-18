<script lang="ts">
  import { toRefs, PropType } from 'vue'
  import { defineComponent, reactive } from 'vue'
  import { Book, BookEntry, ReadingSession, ReadingBlock } from '~/types/index'
  import { format, differenceInMinutes } from 'date-fns'
  import { v4 as uuidv4 } from 'uuid'

  export default defineComponent({
    props: {
      availableBooks: { type: Array as PropType<Book[]>, required: true },
    },
    setup: (props) => {
      const state = reactive({
        entry: {
          id: uuidv4(),
          book_id: '',
          date: format(new Date(), 'yyyy-MM-dd'),
          minutes: 0,
          pages: 0,
        } as BookEntry,
        startPage: 0,
        endPage: 0,
        startTime: '',
        endTime: '',
        readingSession: {} as ReadingSession,
        currentReadingBlock: {} as ReadingBlock,
        newEntry: {} as BookEntry,
        isReading: false,
        isPaused: false,
        manualEntry: false,
      })

      const calculateTimeRead = () => {
        let totalReadingTime = 0
        if (state.readingSession.blocks.length > 0) {
          totalReadingTime = state.readingSession.blocks.reduce(
            (total, readingBlock) =>
              (total += differenceInMinutes(
                readingBlock.endTime || 0,
                readingBlock.startTime
              )),
            0
          )
        }

        return totalReadingTime
      }

      const manuallyCalculateTimeRead = () => {
        if (state.startTime && state.endTime) {
          const startDate = new Date(`${state.entry.date} ${state.startTime}`)
          const endDate = new Date(`${state.entry.date} ${state.endTime}`)

          state.entry.minutes = differenceInMinutes(endDate, startDate)
        }
      }

      const calculateTotalPages = () => {
        if (state.endPage > 0 && state.startPage > 0) {
          state.entry.pages = state.endPage - state.startPage
        }
      }

      const startReading = () => {
        state.isReading = true
        state.currentReadingBlock = {
          startTime: new Date(),
        }
      }

      const pauseReading = () => {
        state.isReading = false
        state.isPaused = true
        completeReadingBlock()
      }

      const endReading = () => {
        state.isReading = false
        completeReadingBlock()
        state.entry.minutes = calculateTimeRead()
        calculateTotalPages()
      }

      const completeReadingBlock = () => {
        state.currentReadingBlock.endTime = new Date()

        state.readingSession.blocks.push(state.currentReadingBlock)
      }

      const addNewEntry = async () => {
        await fetch('/api/add-book-entry', {
          method: 'POST',
          body: JSON.stringify({ entry: state.entry }),
        })
          .then((res) => {
            res.json().then((body) => {
              if (body.addedBookEntry) {
                state.newEntry = body.addedBookEntry
                resetForm(true)
              }
            })
          })
          .catch((err) => {
            console.log(err.exception)
            console.log(err)
          })
      }

      const resetForm = (newEntryAdded: Boolean = false) => {
        //reset state
        state.entry = {
          id: uuidv4(),
          book_id: '',
          date: format(new Date(), 'yyyy-MM-dd'),
          minutes: 0,
          pages: 0,
        }

        if (newEntryAdded) {
          state.newEntry = {} as BookEntry
        }
      }

      return {
        ...toRefs(state),
        addNewEntry,
        resetForm,
        startReading,
        pauseReading,
        endReading,
        calculateTotalPages,
        manuallyCalculateTimeRead,
      }
    },
  })
</script>
<template>
  <div class="[ add-book-wrapper ] [ max-width-wrapper ]">
    <form class="add-book-form">
      <h2 class="heading">Add Book Entry</h2>
      <div class="inputs">
        <label for="book" class="input-box">
          <span class="field-name">Book *</span>
          <select
            id="book"
            name="entry for book"
            :required="true"
            v-model="entry.book_id"
          >
            <option
              v-for="book in availableBooks"
              :key="book.id"
              :value="book.id"
            >
              {{ book.title }} - {{ book.authors.join(', ') }}
            </option>
          </select>
        </label>
        <div class="checkbox-input">
          <input
            id="entry-type"
            type="checkbox"
            name="entry-type"
            v-model="manualEntry"
          />
          <label class="field-name" for="entry-type">Manually Add Entry?</label>
        </div>
        <label for="date" class="input-box">
          <span class="field-name">Date (YYYY-MM-DD)*</span>
          <input id="date" type="text" name="date" v-model="entry.date" />
        </label>
        <label for="startingPage" class="input-box">
          <span class="field-name">Starting Page *</span>
          <input
            id="startingPage"
            type="number"
            name="startingPage"
            v-model.number="startPage"
            @input="calculateTotalPages"
          />
        </label>
        <label for="endingPage" class="input-box">
          <span class="field-name">Ending Page *</span>
          <input
            id="endingPage"
            type="number"
            name="endingPage"
            v-model.number="endPage"
            @input="calculateTotalPages"
          />
        </label>
        <div v-show="!manualEntry" class="reading-control-buttons">
          <button type="button" class="control-btn btn" @click="startReading">
            <carbon-play-filled-alt />
          </button>
          <button
            type="button"
            class="control-btn btn"
            @click="pauseReading"
            :disabled="!isReading"
          >
            <carbon-pause-filled />
          </button>
          <button
            type="button"
            class="control-btn btn"
            @click="endReading"
            :disabled="!isReading"
          >
            <carbon-stop-filled />
          </button>
        </div>
        <div v-show="manualEntry" class="manual-time-inputs">
          <label for="startTime" class="input-box">
            <span class="field-name">Start Time</span>
            <input
              id="startTime"
              type="text"
              name="startTime"
              v-model="startTime"
              @change="manuallyCalculateTimeRead"
            />
          </label>
          <label for="endTime" class="input-box">
            <span class="field-name">End Time</span>
            <input
              id="endTime"
              type="text"
              name="endTime"
              v-model="endTime"
              @change="manuallyCalculateTimeRead"
            />
          </label>
        </div>
        <label for="timeRead" class="input-box">
          <span class="field-name">Total Time Read</span>
          <input
            id="timeRead"
            type="number"
            name="thumbnail"
            v-model.number="entry.minutes"
            :readonly="manualEntry ? false : true"
          />
        </label>
        <label for="pagesRead" class="input-box">
          <span class="field-name">Pages Read</span>
          <input
            id="pagesRead"
            type="number"
            name="pages read"
            v-model.number="entry.pages"
            :readonly="manualEntry ? false : true"
          />
        </label>
      </div>
      <div class="buttons">
        <button class="reset-btn btn" type="button" @click="resetForm(false)">
          Reset
        </button>
        <button class="submit-btn btn" type="submit" @click="addNewEntry">
          Add Entry
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
  .add-book-wrapper {
    position: relative;
    padding-top: 1rem;
    padding-bottom: 1rem;
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
    color: var(--black);
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

  .add-book-form .inputs .checkbox-input .field-name {
    color: var(--white);
    font-weight: 700;
  }

  .add-book-form .inputs .input-box .field-name {
    color: var(--accent-1);
    font-weight: 700;
  }

  .add-book-form .inputs .input-box input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #fff;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: transparent;
    border-radius: 0;
    color: #fff;
    font-size: 16px;
    outline: none;
  }

  .add-book-form .inputs .checkbox-input {
    position: relative;
  }

  .add-book-form .inputs .checkbox-input [type='checkbox']:not(:checked),
  [type='checkbox']:checked {
    position: absolute;
    left: 0;
    opacity: 0.01;
  }

  .add-book-form
    .inputs
    .checkbox-input
    [type='checkbox']:not(:checked)
    + label,
  .add-book-form .inputs .checkbox-input [type='checkbox']:checked + label {
    position: relative;
    padding-left: 2rem;
    cursor: pointer;
    font-size: 1.05rem;
    line-height: 1.8;
  }

  /* checkbox aspect */
  .add-book-form
    .inputs
    .checkbox-input
    [type='checkbox']:not(:checked)
    + label:before,
  .add-book-form
    .inputs
    .checkbox-input
    [type='checkbox']:checked
    + label:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 1.4em;
    height: 1.4em;
    border: 1px solid var(--accent-1);
    background: var(--primary);
    border-radius: 0.2em;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 0 rgba(3, 233, 244, 0.2);
    content: '';
    -webkit-transition: all 0.275s;
    transition: all 0.275s;
  }

  .add-book-form
    .inputs
    .checkbox-input
    [type='checkbox']:checked
    + label:before {
    background: var(--accent-1);
  }

  /* checked mark aspect */
  .add-book-form
    .inputs
    .checkbox-input
    [type='checkbox']:not(:checked)
    + label:after,
  .add-book-form
    .inputs
    .checkbox-input
    [type='checkbox']:checked
    + label:after {
    position: absolute;
    top: 0.6em;
    left: 0.18em;
    color: var(--primary);
    content: '✕';
    font-size: 1.375rem;
    line-height: 0;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }

  /* checked mark aspect changes */
  .add-book-form
    .inputs
    .checkbox-input
    [type='checkbox']:not(:checked)
    + label:after {
    opacity: 0;
    -webkit-transform: scale(0) rotate(45deg);
    transform: scale(0) rotate(45deg);
  }

  .add-book-form
    .inputs
    .checkbox-input
    [type='checkbox']:checked
    + label:after {
    opacity: 1;
    -webkit-transform: scale(1) rotate(0);
    transform: scale(1) rotate(0);
  }

  .thumbnail {
    position: relative;
    display: block;
    overflow: hidden;
    width: 100%;
    max-width: 400px;
    min-height: 300px;
    margin: 0 auto;
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

  .book-cover-placeholder {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      to bottom,
      rgba(36, 59, 85, 0.4) 0%,
      #000000 65%,
      #000000 100%
    );
    background-blend-mode: multiply;
    color: var(--white);
  }

  .book-cover-placeholder h3 {
    font-size: 3rem;
    transform: rotate(25deg);
  }

  .buttons,
  .reading-control-buttons {
    display: flex;
    width: 100%;
    justify-content: center;
    grid-area: buttons;
  }

  .submit-btn,
  .reset-btn,
  .control-btn {
    max-width: fit-content;
    margin: 0 0.5rem;
  }

  .control-btn {
    display: inline-flex;
    align-items: center;
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
  }
</style>
