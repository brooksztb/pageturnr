import { reactive, toRefs, Ref, onMounted, onBeforeUnmount } from 'vue'

export type Sticky = () => { observer: Ref<IntersectionObserver> }

export default function useSticky() {
  const stickyState = reactive({
    observer: new IntersectionObserver(
      ([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1),
      { threshold: [1] }
    ),
  })

  onMounted(() => {
    document
      .querySelectorAll('.sticky')
      .forEach((element) => stickyState.observer.observe(element))
  })

  onBeforeUnmount(() => {
    stickyState.observer.disconnect()
  })

  return { ...toRefs(stickyState) }
}
