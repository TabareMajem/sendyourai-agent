import React from 'react';
import { Calendar, MessageSquare, Image, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Campaign } from '../../../../lib/agents/marketing/types';

interface CampaignContentTimelineProps {
  campaign: Campaign;
}

export function CampaignContentTimeline({ campaign }: CampaignContentTimelineProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'scheduled':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getContentTypeIcon = (contentId: string) => {
    const content = [...campaign.content.copy, ...campaign.content.visuals]
      .find(c => c.channel + c.text || c.url === contentId);
    
    if (!content) return <FileText className="h-5 w-5 text-gray-400" />;

    if ('text' in content) {
      return <MessageSquare className="h-5 w-5 text-blue-500" />;
    } else {
      return <Image className="h-5 w-5 text-purple-500" />;
    }
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {campaign.schedule.map((event, index) => {
          const isLast = index === campaign.schedule.length - 1;
          return (
            <li key={event.contentId}>
              <div className="relative pb-8">
                {!isLast && (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex space-x-3">
                  <div>
                    <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                      {getContentTypeIcon(event.contentId)}
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm text-gray-900">
                        {event.channel} Post
                      </p>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Scheduled for {event.date.toLocaleString()}
                      </p>
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                      {getStatusIcon(event.status)}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}