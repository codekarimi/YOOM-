"use client";


import React, { useState } from 'react'
import HomeCard from './HomeCard';
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { toast, useToast } from "@/hooks/use-toast"
import { Textarea } from './ui/textarea';
import Loader from './Loader';
import { Input } from './ui/input';




const initialValues = {
  dateTime: new Date(),
  description: '',
  link: '',
};

const MeetingType = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >(undefined);
  const [values, setvalues] = useState(initialValues)
  const [callDetail, setCallDetail] = useState<Call>();

  const user = useUser; // clerk user
  const client = useStreamVideoClient(); // Streamio  

  const createMeeting = async () => { //start meeting click!!

    if (!client || !user) return;
    try {

      if (!values.dateTime) {
        toast({ title: 'Please select a date and time' });
        return;
      }
      const id = crypto.randomUUID(); // generate unique id
      const callType = 'default';
      const call = client.call(callType,id);

    if(!call) throw new Error ("No call");
    
    const startsAt =values.dateTime.toISOString() || new Date(Date.now()).toISOString();
    const description = values.description || 'Instant Meeting';

    await call.getOrCreate({
      data: {
        starts_at: startsAt,
        custom: {
          description,
        },
      },
    });

    setCallDetail(call);

    if (!values.description) {
      router.push(`/meeting/${call.id}`);
    }
    toast({
      title: 'Meeting Created',
    });
    } catch (error) {
      console.error(error);
      toast({ title: 'Failed to create Meeting' });
    }

    
  

  }

  if (!user || !client) return <Loader/>;

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;



 
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState("isInstantMeeting")}
        className="bg-orange-1"
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-blue-1"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        handleClick={() => setMeetingState("isScheduleMeeting")}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-1"
        handleClick={() => router.push("/recordings")}
      />

      {!callDetail ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create a Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal loading-[22px] text-sky-2"> Add a description for your meeting </label>
            <Textarea className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-sky-500 focus-visible:ring-2 " onChange={(e) =>{
              setvalues({ ...values, description: e.target.value });
            }}/>
          </div>
          <div className="flex flex-col w-full gap-2.5">
          <label className="text-base text-normal loading-[22px] text-sky-2">Select Date and Time</label>
          <input type="datetime-local" className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-sky-500 focus-visible:ring-2" onChange={(e) =>{
            setvalues({ ...values, dateTime: new Date(e.target.value) });
          }}/>
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          buttonText="Copy meeting link"
          buttonIcon="/icons/copy.svg"
          image="/icons/checked.svg"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: 'Link Copied' });
          }}
        />
      )}

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start a Meeting"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />

         <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setvalues({ ...values, link: e.target.value })}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>


      
    </section>
  );
}

export default MeetingType