import React, { Suspense, lazy, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import './index.css';
import App from './App';
import './assets/vendor/bootstrap-datepicker/bootstrap-datepicker.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import 'flag-icon-css/css/flag-icon.min.css';
import { Backdrop } from '@mui/material';
import NewLoader from './Components/Main/NewLoader';
import RecruiterSales from './Components/Main/RecruiterSales';




const AboutUs = lazy(() => import('./Components/Main/AboutUs'));
const PrivacyCommitment = lazy(() => import('./Components/Main/PrivacyCommitment'));
const TermsOfUse = lazy(() => import('./Components/Main/TermsOfUse'));
const Sitemap = lazy(() => import('./Components/Main/Sitemap'));
const QuickSearch = lazy(() => import('./Components/Main/Search/QuickSearch'));
const AdvanceSearch = lazy(() => import('./Components/Main/Search/AdvanceSearch'));
const AdvanceSearchResult = lazy(() => import('./Components/Main/Search/AdvanceSearchResult'));
const Register = lazy(() => import('./Components/Main/Registration/Register'));
const ProfileDashboard = lazy(() => import('./Components/Main/Dashboard/ProfileDashboard'));
const MyProfile = lazy(() => import('./Components/Main/Candidate/MyProfile'));
const JobDetails = lazy(() => import('./Components/Main/Jobs/JobDetails'));
const ChangePassword = lazy(() => import('./Components/Main/Candidate/ChangePassword'));
const ContactUs = lazy(() => import('./Components/Main/ContactUs'));
const SearchGuidelines = lazy(() => import('./Components/Main/SearchGuidelines'));
const Error404 = lazy(() => import('./Components/Main/Error404'));
const Error401 = lazy(() => import('./Components/Main/Error401'));
const Jobs = lazy(() => import('./SEO/Jobs'));
const JobDetailsByJobCode = lazy(() => import('./Components/Main/Jobs/JobDetailsByJobCode'));
const ImageUploader = lazy(() => import('./Components/Main/ImageUploader'));  
const AccountSettings = lazy(() => import('./Components/Main/Candidate/AccountSettings/AccountSetting'));
const JobsPage = lazy(() => import('./Components/Main/JobsPage'));
const Blogs2 = lazy(() => import('./Components/Main/Blogs2'));
const ResumeBuilder = lazy(() => import('./Components/Main/ResumeBuilder/ResumeBuilder'));
const GulfPost = lazy(() => import('./Components/Main/GulfPost'));
const AddBlog = lazy(() => import('./Components/Main/AddBlog'));
const HomePage = lazy(() => import('./Components/Main/HomePage'));
const SuccessStory2 = lazy(() => import('./Components/Main/SuccessStory2'));



i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'hi', 'bn', 'ta', 'ur', 'ml', 'or', 'te','ar','ne','pl','ro','si'],
    fallbackLng: 'en',
    debug: false,
    detection: {
      order: ['path', 'cookie', 'htmlTag'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
  });

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
  <GoogleOAuthProvider clientId="560896649854-9ba2lulvu20grhfb4fcfflos2k0m2p7g.apps.googleusercontent.com">
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true} // Open the loader while loading
        >
          <NewLoader />
        </Backdrop>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gulf" element={<GulfPost />} />
          <Route path="/addBlog" element={<AddBlog />} />
          <Route path="/idxjobs" element={<JobsPage />} />
          <Route path="/app" element={<App />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/blog" element={<Blogs2 />} />
          <Route path="/successstory" element={<SuccessStory2 />} />
          <Route path="/searchguidelines" element={<SearchGuidelines />} />
          <Route path="/privacycommitment" element={<PrivacyCommitment />} />
          <Route path="/termsofuse" element={<TermsOfUse />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/jobs/:ji" element={<Jobs />} />
          <Route path="/jobs/:cat/:ji" element={<Jobs />} />
          <Route path="/quicksearch" element={<QuickSearch />} />
          <Route path="/advancesearch" element={<AdvanceSearch />} />
          <Route path="/advancesearchresult" element={<AdvanceSearchResult />} />
          <Route path="/industry/:industryName" element={<AdvanceSearchResult />} />
          <Route path="/register" element={<Register />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/profiledashboard" element={<ProfileDashboard />} />
          <Route path="/accountsettings" element={<AccountSettings />} />
          <Route path="/jd/:jCode" element={<JobDetailsByJobCode />} />
          <Route path="/jobdetails" element={<JobDetails />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/imageUploader" element={<ImageUploader />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/404" element={<Error404 />} />
          <Route path="/401" element={<Error401 />} />
          <Route path="/sales" element={<RecruiterSales />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
