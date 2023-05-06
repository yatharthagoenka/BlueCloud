import React, {useState, useEffect} from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import AppService from '../../../services/app.service'
import AuthService from '../../../services/auth.service'
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';

const RecentActivity = () => {
    const [user , setUser] = useState()
    const [activity , setActivity] = useState([])
    let currentUser;

    useEffect(() => {
        currentUser = AuthService.getCurrentUser();
        setUser(currentUser.user)
    }, []);

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
      
      function formatTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    }

    const getColor = (action) => {
        switch (action) {
            case 'upload':
                return 'primary';
            case 'login':
                return 'secondary';
            case 'register':
                return 'warning'
            case 'logout':
                return 'error';
            default:
                return 'grey';
        }
    };

    useEffect(()=>{
        console.log("fetching activity from server.")
        AppService.getUserActivity(currentUser.user._id, JSON.parse(localStorage.getItem("user")).token).then(
            response => {
                console.log(response.data)
                setActivity(response.data);
            },
            error => {
                console.log(error)
            }
        );
    }, [])

  return (
    <DashboardCard title={`Recent Activity : ${user?.username}`}>
      <>
        <Timeline
          className="theme-timeline"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          sx={{
            p: 0,
            mb: '-40px',
            '& .MuiTimelineConnector-root': {
              width: '1px',
              backgroundColor: '#efefef'
            },
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.5,
              paddingLeft: 0,
            },
          }}
        >
        {activity.map(record => (
          <TimelineItem>
            <TimelineOppositeContent>{formatTime(record.time)}</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color={getColor(record.action)} variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>{record.action} : {formatDate(record.time)}</TimelineContent>
          </TimelineItem>
        ))}

        {/* //   <TimelineItem>
        //     <TimelineOppositeContent>10:00 am</TimelineOppositeContent>
        //     <TimelineSeparator>
        //       <TimelineDot color="secondary" variant="outlined" />
        //       <TimelineConnector />
        //     </TimelineSeparator>
        //     <TimelineContent>
        //       <Typography fontWeight="600">New sale recorded</Typography>{' '}
        //       <Link href="/" underline="none">
        //         #ML-3467
        //       </Link>
        //     </TimelineContent>
        //   </TimelineItem>
        //   <TimelineItem>
        //     <TimelineOppositeContent>12:00 am</TimelineOppositeContent>
        //     <TimelineSeparator>
        //       <TimelineDot color="success" variant="outlined" />
        //       <TimelineConnector />
        //     </TimelineSeparator>
        //     <TimelineContent>Payment was made of $64.95 to Michael</TimelineContent>
        //   </TimelineItem>
        //   <TimelineItem>
        //     <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
        //     <TimelineSeparator>
        //       <TimelineDot color="warning" variant="outlined" />
        //       <TimelineConnector />
        //     </TimelineSeparator>
        //     <TimelineContent>
        //       <Typography fontWeight="600">New sale recorded</Typography>{' '}
        //       <Link href="/" underline="none">
        //         #ML-3467
        //       </Link>
        //     </TimelineContent>
        //   </TimelineItem>
        //   <TimelineItem>
        //     <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
        //     <TimelineSeparator>
        //       <TimelineDot color="error" variant="outlined" />
        //       <TimelineConnector />
        //     </TimelineSeparator>
        //     <TimelineContent>
        //       <Typography fontWeight="600">New arrival recorded</Typography>
        //     </TimelineContent>
        //   </TimelineItem>
        //   <TimelineItem>
        //     <TimelineOppositeContent>12:00 am</TimelineOppositeContent>
        //     <TimelineSeparator>
        //       <TimelineDot color="success" variant="outlined" />
        //     </TimelineSeparator>
        //     <TimelineContent>Payment Received</TimelineContent>
        //   </TimelineItem> */}
        </Timeline>
      </>
    </DashboardCard>
  );
};

export default RecentActivity;