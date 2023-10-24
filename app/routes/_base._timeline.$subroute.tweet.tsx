import { parse } from '@conform-to/zod'
import type { ActionFunctionArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, useActionData, useLocation, useNavigate } from '@remix-run/react'
import { ChevronLeftIcon } from '~/components/icons'
import { UserAvatar } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { Dialog, DialogClose, DialogContent } from '~/components/ui/dialog'
import { Textarea } from '~/components/ui/textarea'
import { z } from 'zod'
import { useForm } from '@conform-to/react'
import { getUserId } from '~/utils/user-session.server'
import { createPost } from '~/models/post.server'

const tweetSchema = z.object({
  content: z.string().min(1).max(250),
})

export async function action({ request, params }: ActionFunctionArgs) {
  const authorId = await getUserId(request)

  if (!authorId) {
    return redirect('/auth')
  }

  const fd = await request.formData()
  const submission = parse(fd, { schema: tweetSchema })

  if (submission.intent !== 'submit' || !submission.value) {
    return json(submission)
  }

  await createPost({ ...submission.value, authorId })

  const to = params.subroute ?? 'home'

  return redirect(`/${to}`)
}

export default function TweetPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const lastSubmission = useActionData<typeof action>()
  const [form, fields] = useForm({
    lastSubmission,
    shouldValidate: 'onBlur',
  })

  const to = location.pathname.split('/')[0]

  return (
    <Dialog open onOpenChange={() => navigate(`/${to}`)}>
      <DialogContent>
        <Form method="post" {...form.props}>
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
              <Textarea
                maxLength={250}
                placeholder="What is happening?!"
                name="content"
                defaultValue={fields.content.defaultValue}
              />
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
