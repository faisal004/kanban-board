import { Comment } from '@/types/types';
import { MessageCircle } from 'lucide-react';


interface CommentSectionProps {
  comments?: Comment[];
}

const CommentSection =({ comments }: CommentSectionProps)=> {
  if (!comments?.length) {
    return (
      <div className="flex flex-col items-center justify-center m-5 p-12 bg-zinc-800/50 rounded-lg">
        <MessageCircle className="w-8 h-8 text-gray-400 mb-2" />
        <p className="text-gray-400 text-sm">No comments yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-3 ">
      {comments.map((comment) => (
        <div 
          key={comment.id} 
          className="flex gap-3 bg-zinc-800 rounded-lg p-4"
        >
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
              {comment.userName.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* Comment Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-white">
                {comment.userName}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(comment.timestamp).toLocaleDateString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            <p className="text-gray-300 text-sm">
              {comment.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentSection