import { existsSync } from 'node:fs'
import path from 'node:path'
import type { FC } from 'react'
import { VideoLoop } from '@/components/ui/VideoLoop'
import { videoSlots, type VideoSlotName } from '@/data/videos'

const fileExists = (publicPath: string): boolean => existsSync(path.join(process.cwd(), 'public', publicPath))

type VideoLoopSlotProps = {
  name: VideoSlotName
  sizes: string
  className?: string
}

/**
 * Server component: checks which video files exist before rendering, so missing clips are never
 * requested (no 404s) and the poster photograph with its slow zoom is shown instead.
 */
export const VideoLoopSlot: FC<VideoLoopSlotProps> = ({ className, name, sizes }) => {
  const slot = videoSlots[name]

  return (
    <VideoLoop
      className={className}
      sizes={sizes}
      slot={slot}
      sources={{ mp4: fileExists(slot.mp4), webm: fileExists(slot.webm) }}
    />
  )
}
