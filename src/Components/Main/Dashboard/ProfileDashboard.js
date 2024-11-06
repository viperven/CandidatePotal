import React, { useEffect, useState } from 'react'
import Layout from '../../../Layout/Layout'
import JobSuggestion from './JobSuggestion'
import AppliedJob from './AppliedJob'
import SavedJob from './SavedJob'
import SavedSearch from './SavedSearch'
import Feeds from './Feeds'
import { AuthService } from '../../../Services/AuthService'
import { Modal, ModalBody } from 'react-bootstrap';
import LoginModal from '../../LogIn/LoginModal'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Interviews from './Interviews'

function ProfileDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentTab, setcurrentTab] = useState(1);
  // const handleLoginClose = () => setloginShow(false);
  // const handleLoginShow = () => setloginShow(true);
  // const [loginShow, setloginShow] = useState(false);
  const jobSuggestion = () => {
    setcurrentTab(1);
  }
  const appliedJob = () => {
    setcurrentTab(2);
  }
  const savedJob = () => {
    setcurrentTab(3);
  }
  const savedSearch = () => {
    setcurrentTab(4);
  }
  const interviews = () => {
    setcurrentTab(5);
  }
  const feeds = () => {
    setcurrentTab(6);
  }
  // const CloseModal = (res) => {
  //   if (res === 1) {
  //     handleLoginClose();
  //   } else {
  //     navigate(
  //       {
  //         pathname: "/profiledashboard"
  //       }
  //     )
  //   }
  // }
  useEffect(() => {
    if (AuthService.isAuthenticatedUser()) {
      jobSuggestion();
    }
    else {
      // handleLoginShow();

    }

  }, [])

  return (
    <>

      <Layout>
        {/* <Modal
          show={loginShow}
          size='lg'
          onHide={handleLoginClose}
          animation={true}
        >
          <ModalBody>
            <LoginModal CallbackRes={CloseModal} />
          </ModalBody>
        </Modal> */}
        <section>
          <div className="container mt-5">
            <div className="col-md-12">
              <ul className="nav nav-pills nav-pills-jh" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="nav-link active" id="job-suggestion-tab" data-bs-toggle="tab" onClick={() => jobSuggestion()}
                    data-bs-target="#job-suggestion-tab-pane" type="button" role="tab" aria-controls="job-suggestion-tab-pane"
                    aria-selected="true"><i className='bx bxs-star'></i>{t("Job_Suggestion")}</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="applied-jobs-tab" data-bs-toggle="tab" data-bs-target="#applied-jobs-tab-pane" onClick={() => appliedJob()}
                    type="button" role="tab" aria-controls="applied-jobs-tab-pane" aria-selected="false">
                    <i className='bx bx-down-arrow-circle'></i>{t("Applied_Jobs")}</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="saved-jobs-tab" data-bs-toggle="tab" data-bs-target="#saved-jobs-tab-pane" onClick={() => savedJob()}
                    type="button" role="tab" aria-controls="saved-jobs-tab-pane" aria-selected="false"><i
                      className='bx bx-save'></i>{t("Saved_Jobs")}</button>
                </li>
                {/* <li className="nav-item" role="presentation">
                  <button className="nav-link" id="saved-search-tab" data-bs-toggle="tab" data-bs-target="#saved-search-tab-pane" onClick={() => savedSearch()}
                    type="button" role="tab" aria-controls="saved-search-tab-pane" aria-selected="false"><i
                      className='bx bx-search-alt'></i>Saved Search</button>
                </li> */}
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="interviews-tab" data-bs-toggle="tab" data-bs-target="#interviews-tab-pane" type="button" onClick={() => interviews()}
                    role="tab" aria-controls="interviews-tab-pane" aria-selected="false"><i className='bx bx-info-circle'></i>{t("Interviews")}</button>
                </li>

                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="feeds-tab" data-bs-toggle="tab" data-bs-target="#feeds-tab-pane" type="button" onClick={() => feeds()}
                    role="tab" aria-controls="feeds-tab-pane" aria-selected="false"><i className='bx bx-note'></i>{t("Feeds")}</button>
                </li>
              </ul>
            </div>

            <div className="tab-content" id="myTabContent">

              <div className="tab-pane fade show active" id="job-suggestion-tab-pane" role="tabpanel"
                aria-labelledby="job-suggestion-tab" tabIndex="0">
                {currentTab === 1 ?
                  <JobSuggestion /> : null}
              </div>

              <div className="tab-pane fade" id="applied-jobs-tab-pane" role="tabpanel" aria-labelledby="applied-jobs-tab"
                tabIndex="0">
                {currentTab === 2 ?
                  <AppliedJob /> : null}
              </div>

              <div className="tab-pane fade" id="saved-jobs-tab-pane" role="tabpanel" aria-labelledby="saved-jobs-tab"
                tabIndex="0">
                {currentTab === 3 ?
                  <SavedJob /> : null}
              </div>

              {/* <div className="tab-pane fade" id="saved-search-tab-pane" role="tabpanel" aria-labelledby="saved-search-tab"
                tabIndex="0">
                {currentTab === 4 ?
                  <SavedSearch /> : null}
              </div> */}
              <div className="tab-pane fade" id="interviews-tab-pane" role="tabpanel" aria-labelledby="interviews-tab" tabIndex="0">
                {currentTab === 5 ?
                  <Interviews /> : null}
              </div>
              <div className="tab-pane fade" id="feeds-tab-pane" role="tabpanel" aria-labelledby="feeds-tab" tabIndex="0">
                {currentTab === 6 ?
                  <Feeds /> : null}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default ProfileDashboard