import { Form, useLocation, useNavigate } from '@remix-run/react'
import { ChevronLeftIcon } from '~/components/icons'
import { UserAvatar } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { Dialog, DialogClose, DialogContent } from '~/components/ui/dialog'
import { Textarea } from '~/components/ui/textarea'

export default function TweetPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const to = location.pathname.split('/')[0]

  return (
    <Dialog open onOpenChange={() => navigate(`/${to}`)}>
      <DialogContent>
        <Form method="post">
          <div className="mb-6 flex justify-between">
            <DialogClose>
              <ChevronLeftIcon />
            </DialogClose>
            <div className="flex items-center gap-4">
              <p className="select-none font-semibold text-primary opacity-50">
                Drafts
              </p>
              <Button variant="primary" className="px-4 md:hidden">
                Post
              </Button>
            </div>
          </div>
          <div className="border-b">
            <div className="grid grid-cols-[max-content,minmax(0,1fr)] gap-3">
              <UserAvatar />
              <Textarea maxLength={250} placeholder="What is happening?!" />
            </div>
            <p className="mb-2 select-none font-semibold text-primary">
              Everyone can reply
            </p>
          </div>
          <div className="mt-2 grid grid-cols-[minmax(0,1fr),max-content]">
            <div></div>
            <Button variant="primary" className="hidden px-4 md:block">
              Post
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
