import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import {getFullDetailsOfCourse} from "../services/operations/courseDetailsAPI";
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../reducers/slices/viewCourseSlice';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';

function ViewCourse() {
  const [reviewModal, setReviewModal] = useState(true);
  const {courseId} = useParams();
  const {token} = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecificDetails = async() => {
      const courseData = await getFullDetailsOfCourse(courseId, token)
      // console.log("Course Data here... ", courseData.courseDetails)
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
      dispatch(setEntireCourseData(courseData.courseDetails))
      dispatch(setCompletedLectures(courseData.completedVideos))
      let lectures = 0
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length
      })
      dispatch(setTotalNoOfLectures(lectures))
    }

    setCourseSpecificDetails();
  },[courseId])

  return (
    <>
        <div className="relative flex min-h-[calc(100vh-3.5rem)]">
            <VideoDetailsSidebar setReviewModal={setReviewModal}/>
            <div>
                <Outlet/>
            </div>
        </div>

        {reviewModal && (<CourseReviewModal setReviewModal={setReviewModal}/>)}
    </>
  )
}

export default ViewCourse