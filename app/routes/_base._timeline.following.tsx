import * as ScrollArea from '@radix-ui/react-scroll-area'
import { Post } from '~/components/post'

export default function FollowingPage() {
  return (
    <main>
      <ScrollArea.Root className="h-[100vh] w-full overflow-hidden">
        <ScrollArea.Viewport className="h-full w-full pb-40">
          {Array.from({ length: 10 }).map((_, i) => (
            <Post key={i} />
          ))}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="duration-[160ms] flex touch-none select-none p-0.5 transition-colors ease-out data-[orientation=vertical]:w-2.5"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-secondary before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </main>
  )
}
