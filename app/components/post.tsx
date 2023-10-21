import {
  ImpressionsIcon,
  LikesIcon,
  MessagesIcon,
  MoreIcon,
  RetweetsIcon,
  ShareIcon,
} from './icons'
import { UserAvatar } from './ui/avatar'

export function Post() {
  return (
    <article className="grid grid-cols-[max-content,minmax(0,1fr)] gap-3 border-b border-secondary px-4 py-2">
      <UserAvatar />
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <span className="font-bold">John Doe</span>
            <span className="text-secondary">@johndoe</span>
            <span className="text-secondary">·</span>
            <span className="text-secondary">1h</span>
          </div>
          <MoreIcon className="text-secondary" />
        </div>
        <div>
          Lorem Impsum Dolor Sit Amet Lorem Impsum Dolor Sit Amet Lorem Impsum
          Dolor Sit Amet
        </div>
        <div className="mt-2 grid grid-cols-5 items-center text-sm text-secondary">
          <span className="flex items-center gap-1">
            <MessagesIcon className="h-4 w-4" />
            16
          </span>
          <span className="flex items-center gap-1">
            <RetweetsIcon className="h-4 w-4 text-secondary" />5
          </span>
          <span className="flex items-center gap-1">
            <LikesIcon className="h-4 w-4 text-secondary" />
            125
          </span>
          <span className="flex items-center gap-1">
            <ImpressionsIcon className="h-4 w-4 text-secondary" />
            2k
          </span>
          <ShareIcon className="h-4 w-4 text-secondary" />
        </div>
      </div>
    </article>
  )
}
