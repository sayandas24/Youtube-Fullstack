import React from 'react'
import UserChannelSkeleton from '../UI/skeleton/UserChannelSkeleton'
import { Link } from 'react-router-dom'
import timeSince from '../../utils/timeSince'

function Playlists({ userDetail, loading }) {
  return (
    <div>
      <h1 className="my-2 text-xl">Created Playlist</h1>
          <section className="flex flex-wrap gap-5 my-5">
            {loading ? (
              <UserChannelSkeleton number={4} />
            ) : (
              userDetail.videos &&
              userDetail.videos.map((playlist) => (
                <main key={playlist._id} className="flex gap-5">
                  <section className="flex flex-col gap-2">
                    <Link to={`/p/${playlist._id}`} className="w-[20rem] h-[12rem] cursor-pointer border border-[#393939] rounded-xl overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={playlist.thumbnail}
                        alt=""
                      />
                    </Link>
                    <div className="flex flex-col gap-1">
                      <h1 className="text-[15px]">{playlist.title}</h1>
                      <p className="text-[15px] text-zinc-500">
                        {playlist.totalViews} views .{" "}
                        {timeSince(playlist.createdAt)}
                      </p>
                    </div>
                  </section>
                </main>
              ))
            )}
          </section>
    </div>
  )
}

export default Playlists
