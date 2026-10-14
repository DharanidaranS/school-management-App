import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Alert,
  ScrollView,
  ActivityIndicator,
  Image,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

// ==========================================
// 1. ICONS & LOGOS
// ==========================================

const SchoolbookLogo = () => (
  <View style={styles.loginLogoContainer}>
    <Svg width={76} height={76} viewBox="0 0 100 100" fill="none">
      <Path
        d="M50 14 L85 45 C86.5 46.3 87 48 87 50 L87 75 C87 81.6 81.6 87 75 87 L25 87 C18.4 87 13 81.6 13 75 L13 50 C13 48 13.5 46.3 15 45 Z"
        stroke="#27D5EE"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="50" cy="58" r="14" stroke="#27D5EE" strokeWidth="6" />
      <Circle cx="50" cy="58" r="4.5" fill="#27D5EE" />
    </Svg>
    <Text style={styles.loginLogoTitle}>SCHOOLBOOK</Text>
  </View>
);

const SchoolHoxLogo = () => (
  <View style={styles.schoolHoxLogoWrap}>
    <Svg width={26} height={26} viewBox="0 0 32 32" fill="none">
      <Path
        d="M8 5C8 3.89543 8.89543 3 10 3H19C23.4183 3 27 6.58172 27 11C27 13.4183 25.9265 15.5861 24.2188 16.9844C26.4952 18.2568 28 20.6973 28 23.5C28 27.6421 24.6421 31 20.5 31H10C8.89543 31 8 30.1046 8 29V5Z"
        stroke="#FFFFFF"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.5 9.5H18C19.3807 9.5 20.5 10.6193 20.5 12C20.5 13.3807 19.3807 14.5 18 14.5H13.5V9.5Z"
        fill="#FFFFFF"
      />
      <Path
        d="M13.5 19.5H19.5C21.1569 19.5 22.5 20.8431 22.5 22.5C22.5 24.1569 21.1569 25.5 19.5 25.5H13.5V19.5Z"
        fill="#FFFFFF"
      />
    </Svg>
    <Text style={styles.schoolHoxText}>SchoolHox</Text>
  </View>
);

const EduSphereLogo = () => (
  <View style={styles.eduSphereLogoWrap}>
    <View style={styles.eduSphereIconCircle}>
      <Ionicons name="planet" size={18} color="#FFFFFF" />
    </View>
    <View>
      <Text style={styles.eduSphereBrandName}>EduSphere</Text>
      <Text style={styles.eduSphereBrandTagline}>St. Xavier's International School</Text>
    </View>
  </View>
);

const StudentAvatar = () => (
  <View style={styles.avatarWrap}>
    <Svg width={54} height={54} viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="48" fill="#FDE2C8" />
      <Path
        d="M16 48 C14 20, 86 20, 84 48 C78 34, 62 25, 50 27 C38 25, 22 34, 16 48 Z"
        fill="#2A1B14"
      />
      <Circle cx="15" cy="50" r="7" fill="#F5CCA0" />
      <Circle cx="85" cy="50" r="7" fill="#F5CCA0" />
      <Circle cx="37" cy="48" r="4.5" fill="#20140E" />
      <Circle cx="63" cy="48" r="4.5" fill="#20140E" />
      <Path d="M31 41 Q37 38 43 41" stroke="#2A1B14" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <Path d="M57 41 Q63 38 69 41" stroke="#2A1B14" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <Path d="M42 62 Q50 69 58 62" stroke="#C9684C" strokeWidth="3" strokeLinecap="round" fill="none" />
      <Path d="M18 88 Q50 72 82 88 L88 100 L12 100 Z" fill="#2563EB" />
    </Svg>
  </View>
);

const DialpadIcon = () => (
  <View style={styles.dialpadGrid}>
    {[...Array(9)].map((_, i) => (
      <View key={i} style={styles.dialDot} />
    ))}
  </View>
);

const LANGUAGES = [
  { code: 'Eng', name: 'English' },
  { code: 'Esp', name: 'Español' },
  { code: 'Fra', name: 'Français' },
  { code: 'Deu', name: 'Deutsch' },
  { code: 'Hin', name: 'हिन्दी' },
];

export default function App() {
  // Screens: 'login' | 'dashboard' | 'attendance' | 'fees' | 'homework' | 'bus' | 'smartdiary'
  const [currentScreen, setCurrentScreen] = useState('login');
  const [activeTab, setActiveTab] = useState('Home');

  // Smart Diary Section States
  const [diarySubTab, setDiarySubTab] = useState('Schedule'); // 'Schedule' | 'Grades' | 'Notifications' | 'Settings'
  const [selectedScheduleDay, setSelectedScheduleDay] = useState(13); // Wednesday 13th
  const [selectedScheduleLesson, setSelectedScheduleLesson] = useState(null); // When a lesson is clicked, opens detail screen
  const [replyText, setReplyText] = useState('');
  const [commentsList, setCommentsList] = useState([
    {
      id: 1,
      author: 'William Dunkan',
      role: 'Teacher',
      text: 'Great essay! Your child deserve the highest grade.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    },
  ]);


  // Role-Based Access Control: 'student' | 'parent' | 'teacher' | 'admin'
  const [userRole, setUserRole] = useState('student');
  const [loginRole, setLoginRole] = useState('student'); // Active tab in login screen

  // Role quick credential definitions
  const ROLE_CONFIGS = {
    student: {
      defaultUser: 'student@schoolhox.edu',
      defaultPass: 'student123',
      name: 'Aarav Sharma',
      badge: 'Grade 6-A • Roll 14',
      portalTitle: 'Student Portal',
      initialScreen: 'dashboard',
    },
    parent: {
      defaultUser: 'parent@schoolhox.edu',
      defaultPass: 'parent123',
      name: 'Madhuri Sharma',
      badge: 'Parent of Rita & Rohan',
      portalTitle: 'Parent Portal',
      initialScreen: 'parent_dashboard',
    },
    teacher: {
      defaultUser: 'teacher@schoolhox.edu',
      defaultPass: 'teacher123',
      name: 'Sarah Jenkins',
      badge: 'Senior Faculty • Mathematics',
      portalTitle: 'Teacher Portal',
      initialScreen: 'teacher',
    },
    admin: {
      defaultUser: 'admin@schoolhox.edu',
      defaultPass: 'admin123',
      name: 'Dr. Rajesh Khanna',
      badge: 'Chief Administrator & Principal',
      portalTitle: 'EduSphere Admin Portal',
      initialScreen: 'edusphere_admin',
    },
  };

  // Login Form
  const [username, setUsername] = useState('student@schoolhox.edu');
  const [password, setPassword] = useState('student123');
  const [secureText, setSecureText] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Homework check state
  const [homeworkDone, setHomeworkDone] = useState({
    maths: false,
    science: false,
    english: true,
    history: false,
  });

  // Homework active filter: 'All' | 'Pending' | 'Completed'
  const [homeworkFilter, setHomeworkFilter] = useState('All');

  // Student Dashboard State: Learning materials filter & motivation quote
  const [studentMaterialFilter, setStudentMaterialFilter] = useState('All'); // 'All' | 'Notes' | 'PDFs' | 'Videos'
  const [studentTimetableDay, setStudentTimetableDay] = useState('Today'); // 'Today' | 'Tomorrow'

  // Fees state: tracking paid status
  const [isFeePaid, setIsFeePaid] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Bus Tracking State: Live refreshing / GPS trigger
  const [isLocatingBus, setIsLocatingBus] = useState(false);
  const [lastBusUpdate, setLastBusUpdate] = useState('Just now');

  // Modals
  const [selectedLang, setSelectedLang] = useState('Eng');
  const [langModalVisible, setLangModalVisible] = useState(false);
  const [dialpadModalVisible, setDialpadModalVisible] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [forgotModalVisible, setForgotModalVisible] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [privacyModalVisible, setPrivacyModalVisible] = useState(false);

  // Subpage modals
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [reportCardModalVisible, setReportCardModalVisible] = useState(false);
  const [leaveModalVisible, setLeaveModalVisible] = useState(false);
  const [leaveReason, setLeaveReason] = useState('');
  const [feeReceiptModalVisible, setFeeReceiptModalVisible] = useState(false);
  const [liveMapModalVisible, setLiveMapModalVisible] = useState(false);
  const [callModalVisible, setCallModalVisible] = useState(false);

  // Settings screen interactive toggles
  const [pushNotifEnabled, setPushNotifEnabled] = useState(true);
  const [emailAlertsEnabled, setEmailAlertsEnabled] = useState(true);
  const [smsAlertsEnabled, setSmsAlertsEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  // Notifications screen interactive list & filter
  const [notifFilter, setNotifFilter] = useState('All'); // 'All' | 'Academic' | 'Transport' | 'Fees'
  const [notificationsList, setNotificationsList] = useState([
    {
      id: 1,
      category: 'Academic',
      title: '🎉 Sports Day on 24 May!',
      desc: 'Annual sports day registration is now open. Submit sports preferences to class teacher.',
      time: '10 mins ago',
      unread: true,
      icon: 'trophy',
      iconColor: '#3B82F6',
    },
    {
      id: 2,
      category: 'Transport',
      title: '🚌 Bus Route 12 Live Update',
      desc: 'Bus No. 12 arrived at designated stop 4 on time with verified security clearance.',
      time: '45 mins ago',
      unread: true,
      icon: 'bus',
      iconColor: '#10B981',
    },
    {
      id: 3,
      category: 'Fees',
      title: '💳 Term Fee Reminder',
      desc: 'Outstanding second term fee invoice of ₹4,500 due on 30th May. Download receipt after paying.',
      time: '2 hours ago',
      unread: false,
      icon: 'card',
      iconColor: '#F59E0B',
    },
    {
      id: 4,
      category: 'Academic',
      title: '📚 Unit Test 1 Timetable Released',
      desc: 'Physics & Mathematics tests commence next Monday at 9:00 AM.',
      time: 'Yesterday',
      unread: false,
      icon: 'book',
      iconColor: '#6366F1',
    },
  ]);

  // Teacher Mobile Dashboard State
  const [teacherSearchQuery, setTeacherSearchQuery] = useState('');
  const [teacherSelectedDate, setTeacherSelectedDate] = useState(11);

  // Parent Mobile Dashboard State (Matching Attached Design)
  const [parentActiveTab, setParentActiveTab] = useState('Home'); // 'Home' | 'Diary' | 'Calendar' | 'Messages' | 'Profile'
  const [parentSubScreen, setParentSubScreen] = useState('home'); // 'home' | 'attendance' | 'feed' | 'messages'
  const [parentSelectedChild, setParentSelectedChild] = useState('Rita Sharma'); // 'Rita Sharma' | 'Rohan Sharma' | 'Jyoti Sharma'
  const [parentFeedCategory, setParentFeedCategory] = useState('Feed'); // 'Feed' | 'Class' | 'School' | 'Lead'
  const [parentAttendanceMonth, setParentAttendanceMonth] = useState('August (2019)');
  const [parentNoticeModal, setParentNoticeModal] = useState(false);
  const [parentDrawerModal, setParentDrawerModal] = useState(false);
  const [parentChildDropdownVisible, setParentChildDropdownVisible] = useState(false);
  const [teacherActiveTab, setTeacherActiveTab] = useState('Home'); // 'Home' | 'Students' | 'Schedule' | 'Exams' | 'AskAI'
  const [teacherSelectedMonth, setTeacherSelectedMonth] = useState('FEB-2026');
  const [isAttendanceMarkedToday, setIsAttendanceMarkedToday] = useState(false);
  const [isMeetingScheduled, setIsMeetingScheduled] = useState(false);

  // EduSphere Admin State
  const [adminActiveTab, setAdminActiveTab] = useState('Dashboard'); // 'Dashboard' | 'Faculty' | 'Finance' | 'Alerts' | 'Settings'
  const [adminTimeframe, setAdminTimeframe] = useState('Today'); // 'Today' | 'This Week' | 'This Month'
  const [adminBroadcastModal, setAdminBroadcastModal] = useState(false);
  const [adminBroadcastText, setAdminBroadcastText] = useState('');
  const [adminBroadcastTarget, setAdminBroadcastTarget] = useState('All Campus');
  const [adminFeeRemindSent, setAdminFeeRemindSent] = useState(false);
  const [adminFacultyFilter, setAdminFacultyFilter] = useState('All'); // 'All' | 'Science' | 'Maths' | 'Languages' | 'Humanities'
  const [adminFacultySearch, setAdminFacultySearch] = useState('');
  const [adminAnnouncements, setAdminAnnouncements] = useState([
    {
      id: 1,
      title: 'Annual Sports Day & Athletics Meet',
      date: 'Today, 09:30 AM',
      target: 'All Students & Parents',
      body: 'Final track & field trial schedule published. Students must carry physical consent slips.',
      badge: 'Event',
      badgeBg: '#EFF6FF',
      badgeColor: '#2563EB',
    },
    {
      id: 2,
      title: 'Quarterly Staff Academic Council',
      date: 'Yesterday, 04:15 PM',
      target: 'Faculty & Heads of Dept',
      body: 'Curriculum review & digital lesson plan adoption targets successfully met for Q1.',
      badge: 'Staff',
      badgeBg: '#ECFDF5',
      badgeColor: '#059669',
    },
    {
      id: 3,
      title: 'School Transport GPS Route Revision',
      date: '12 Oct, 11:00 AM',
      target: 'Bus Commuters & Drivers',
      body: 'Route 12 & Route 8 optimized with 10 mins shorter transit times across central zones.',
      badge: 'Transport',
      badgeBg: '#FEF3C7',
      badgeColor: '#D97706',
    },
  ]);

  // Teacher Modals
  const [teacherAttendanceModal, setTeacherAttendanceModal] = useState(false);
  const [teacherHomeworkModal, setTeacherHomeworkModal] = useState(false);
  const [teacherHomeworkTitle, setTeacherHomeworkTitle] = useState('');
  const [teacherHomeworkSubject, setTeacherHomeworkSubject] = useState('Mathematics 6-A');
  const [teacherMarksModal, setTeacherMarksModal] = useState(false);
  const [teacherMarksInput, setTeacherMarksInput] = useState({});
  const [teacherStudentsModal, setTeacherStudentsModal] = useState(false);
  const [teacherMeetingModal, setTeacherMeetingModal] = useState(false);
  const [teacherDrawerModal, setTeacherDrawerModal] = useState(false);

  // Teacher Dedicated Screens State
  const [teacherScheduleDay, setTeacherScheduleDay] = useState('Wed');
  const [teacherExamFilter, setTeacherExamFilter] = useState('All');
  const [teacherAiQuery, setTeacherAiQuery] = useState('');
  const [teacherAiChat, setTeacherAiChat] = useState([
    { id: 1, sender: 'ai', text: 'Hello Teacher! How can I assist you with lesson plans, homework grading, or quiz creation today?' },
  ]);

  // Comprehensive Master Students Management Database (Linked across Student, Teacher, Admin, and Parent)
  const [masterStudentsList, setMasterStudentsList] = useState([
    {
      id: 1,
      admissionNo: 'ADM-2024-001',
      roll: 101,
      name: 'Aarav Sharma',
      gender: 'Male',
      dob: '14 May 2013',
      bloodGroup: 'B+',
      grade: 'Grade 6-A',
      section: 'A',
      status: 'Active',
      statusColor: '#10B981',
      attendancePercent: '94.8%',
      present: true,
      marks: '92/100',
      gpa: '93.2%',
      rank: '3rd',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&q=80',
      guardian: {
        fatherName: 'Vikram Sharma',
        motherName: 'Priya Sharma',
        relation: 'Mother',
        phone: '+91 98765 43210',
        email: 'parent@schoolhox.edu',
        address: '42 Orchid Heights, Central Avenue, City'
      },
      academicHistory: [
        { year: '2025-26', grade: 'Grade 6', term: 'Term 1', percentage: '93.2%', result: 'Promoted with Honors' },
        { year: '2024-25', grade: 'Grade 5', term: 'Final', percentage: '91.5%', result: 'Promoted' },
        { year: '2023-24', grade: 'Grade 4', term: 'Final', percentage: '89.4%', result: 'Promoted' }
      ]
    },
    {
      id: 2,
      admissionNo: 'ADM-2024-002',
      roll: 102,
      name: 'Ananya Verma',
      gender: 'Female',
      dob: '22 Aug 2013',
      bloodGroup: 'O+',
      grade: 'Grade 6-A',
      section: 'A',
      status: 'Active',
      statusColor: '#10B981',
      attendancePercent: '96.2%',
      present: true,
      marks: '88/100',
      gpa: '89.0%',
      rank: '5th',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&q=80',
      guardian: {
        fatherName: 'Sunil Verma',
        motherName: 'Kavita Verma',
        relation: 'Father',
        phone: '+91 98220 11223',
        email: 'kavita.v@gmail.com',
        address: '15 Green Meadows, Lake Road'
      },
      academicHistory: [
        { year: '2025-26', grade: 'Grade 6', term: 'Term 1', percentage: '89.0%', result: 'Distinction' },
        { year: '2024-25', grade: 'Grade 5', term: 'Final', percentage: '88.5%', result: 'Promoted' }
      ]
    },
    {
      id: 3,
      admissionNo: 'ADM-2024-003',
      roll: 103,
      name: 'Dev Patel',
      gender: 'Male',
      dob: '05 Nov 2013',
      bloodGroup: 'A+',
      grade: 'Grade 6-A',
      section: 'A',
      status: 'Pending Verification',
      statusColor: '#F59E0B',
      attendancePercent: '78.5%',
      present: false,
      marks: '79/100',
      gpa: '79.5%',
      rank: '14th',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
      guardian: {
        fatherName: 'Jayesh Patel',
        motherName: 'Bhavna Patel',
        relation: 'Father',
        phone: '+91 97112 33445',
        email: 'jpatel@techcorp.in',
        address: 'B-204 Skyline Towers'
      },
      academicHistory: [
        { year: '2025-26', grade: 'Grade 6', term: 'Term 1', percentage: '79.5%', result: 'Good Standing' }
      ]
    },
    {
      id: 4,
      admissionNo: 'ADM-2023-088',
      roll: 24,
      name: 'Rita Sharma',
      gender: 'Female',
      dob: '18 Jan 2015',
      bloodGroup: 'B+',
      grade: 'Class 4-B',
      section: 'B',
      status: 'Active',
      statusColor: '#10B981',
      attendancePercent: '83.33%',
      present: true,
      marks: '92/100',
      gpa: '92.0%',
      rank: '4th',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&q=80',
      guardian: {
        fatherName: 'Vikram Sharma',
        motherName: 'Madhuri Sharma',
        relation: 'Mother',
        phone: '+91 98450 12345',
        email: 'parent@schoolhox.edu',
        address: '42 Orchid Heights, Central Avenue, City'
      },
      academicHistory: [
        { year: '2025-26', grade: 'Class 4', term: 'Term 1', percentage: '92.0%', result: 'Top 5 in Class' },
        { year: '2024-25', grade: 'Class 3', term: 'Final', percentage: '94.0%', result: 'Excellence in Arts' }
      ]
    },
    {
      id: 5,
      admissionNo: 'ADM-2022-042',
      roll: 12,
      name: 'Rohan Sharma',
      gender: 'Male',
      dob: '11 Jul 2012',
      bloodGroup: 'B+',
      grade: 'Class 7-A',
      section: 'A',
      status: 'Active',
      statusColor: '#10B981',
      attendancePercent: '92.4%',
      present: true,
      marks: '89/100',
      gpa: '91.0%',
      rank: '6th',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&q=80',
      guardian: {
        fatherName: 'Vikram Sharma',
        motherName: 'Madhuri Sharma',
        relation: 'Mother',
        phone: '+91 98450 12345',
        email: 'parent@schoolhox.edu',
        address: '42 Orchid Heights, Central Avenue, City'
      },
      academicHistory: [
        { year: '2025-26', grade: 'Class 7', term: 'Term 1', percentage: '91.0%', result: 'High Honors' }
      ]
    },
    {
      id: 6,
      admissionNo: 'ADM-2025-014',
      roll: 8,
      name: 'Jyoti Sharma',
      gender: 'Female',
      dob: '03 Dec 2019',
      bloodGroup: 'O+',
      grade: 'KG-II',
      section: 'Junior',
      status: 'Active',
      statusColor: '#10B981',
      attendancePercent: '96.1%',
      present: true,
      marks: '98/100',
      gpa: '98.0%',
      rank: '1st',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80',
      guardian: {
        fatherName: 'Vikram Sharma',
        motherName: 'Madhuri Sharma',
        relation: 'Mother',
        phone: '+91 98450 12345',
        email: 'parent@schoolhox.edu',
        address: '42 Orchid Heights, Central Avenue, City'
      },
      academicHistory: [
        { year: '2025-26', grade: 'KG-II', term: 'Term 1', percentage: '98.0%', result: 'Best All-Rounder' }
      ]
    },
    {
      id: 7,
      admissionNo: 'ADM-2024-007',
      roll: 104,
      name: 'Ishaan Gupta',
      gender: 'Male',
      dob: '19 Sep 2013',
      bloodGroup: 'AB+',
      grade: 'Grade 6-A',
      section: 'A',
      status: 'Active',
      statusColor: '#10B981',
      attendancePercent: '95.0%',
      present: true,
      marks: '95/100',
      gpa: '94.5%',
      rank: '2nd',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
      guardian: {
        fatherName: 'Rajeev Gupta',
        motherName: 'Monika Gupta',
        relation: 'Mother',
        phone: '+91 98330 44556',
        email: 'm.gupta@outlook.com',
        address: '77 Heritage Boulevard'
      },
      academicHistory: [
        { year: '2025-26', grade: 'Grade 6', term: 'Term 1', percentage: '94.5%', result: 'Scholarship Holder' }
      ]
    },
    {
      id: 8,
      admissionNo: 'ADM-2024-010',
      roll: 106,
      name: 'Rohan Mehra',
      gender: 'Male',
      dob: '12 Feb 2013',
      bloodGroup: 'O-',
      grade: 'Grade 6-A',
      section: 'A',
      status: 'On Leave',
      statusColor: '#6366F1',
      attendancePercent: '81.0%',
      present: false,
      marks: '68/100',
      gpa: '71.2%',
      rank: '21st',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80',
      guardian: {
        fatherName: 'Amit Mehra',
        motherName: 'Shalini Mehra',
        relation: 'Father',
        phone: '+91 98110 99887',
        email: 'amit.m@consultancy.com',
        address: 'Flat 402, Sunshine Residency'
      },
      academicHistory: [
        { year: '2025-26', grade: 'Grade 6', term: 'Term 1', percentage: '71.2%', result: 'Satisfactory' }
      ]
    }
  ]);

  // Backward compatibility alias for teacher attendance/marks modals
  const teacherStudentsList = masterStudentsList.filter((s) => s.grade === 'Grade 6-A');
  const setTeacherStudentsList = (updater) => {
    setMasterStudentsList((prev) => {
      const g6a = prev.filter((s) => s.grade === 'Grade 6-A');
      const updatedG6a = typeof updater === 'function' ? updater(g6a) : updater;
      const g6aMap = new Map(updatedG6a.map(item => [item.id, item]));
      return prev.map(s => g6aMap.has(s.id) ? { ...s, ...g6aMap.get(s.id) } : s);
    });
  };

  // Student Management UI State
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  const [studentClassFilter, setStudentClassFilter] = useState('All'); // 'All' | 'Grade 6-A' | 'Class 4-B' | 'Class 7-A' | 'KG-II'
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState(null);
  const [studentDetailModalVisible, setStudentDetailModalVisible] = useState(false);
  const [studentAddEditModalVisible, setStudentAddEditModalVisible] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null); // null = Add mode, id = Edit mode

  // Student Form Inputs
  const [formName, setFormName] = useState('');
  const [formAdmNo, setFormAdmNo] = useState('');
  const [formRoll, setFormRoll] = useState('');
  const [formGrade, setFormGrade] = useState('Grade 6-A');
  const [formDob, setFormDob] = useState('');
  const [formBloodGroup, setFormBloodGroup] = useState('B+');
  const [formGender, setFormGender] = useState('Male');
  const [formStatus, setFormStatus] = useState('Active');
  const [formFatherName, setFormFatherName] = useState('');
  const [formMotherName, setFormMotherName] = useState('');
  const [formGuardianPhone, setFormGuardianPhone] = useState('');
  const [formGuardianEmail, setFormGuardianEmail] = useState('');
  const [formAddress, setFormAddress] = useState('');

  // Universal Mobile Attendance Screen State
  const [attendanceClass, setAttendanceClass] = useState('Grade 6-A'); // 'Grade 6-A' | 'Class 4-B' | 'Class 7-A' | 'KG-II'
  const [attendanceDate, setAttendanceDate] = useState('14 Oct 2026');
  // Daily attendance state map: { [studentId]: 'Present' | 'Absent' | 'Leave' }
  const [dailyAttendanceRecords, setDailyAttendanceRecords] = useState({
    1: 'Present',
    2: 'Present',
    3: 'Absent',
    4: 'Present',
    5: 'Present',
    6: 'Leave',
    7: 'Present',
    8: 'Leave',
  });
  const [isAttendanceSaved, setIsAttendanceSaved] = useState(false);

  // Universal Mobile School Fee Management Hub State
  const [feeSearchQuery, setFeeSearchQuery] = useState('');
  const [feeClassFilter, setFeeClassFilter] = useState('All'); // 'All' | 'Grade 6-A' | 'Class 4-B' | 'Class 7-A' | 'KG-II'
  const [feeStatusFilter, setFeeStatusFilter] = useState('All'); // 'All' | 'Paid' | 'Pending' | 'Overdue'
  const [selectedReceiptTxn, setSelectedReceiptTxn] = useState(null);
  const [receiptDetailModalVisible, setReceiptDetailModalVisible] = useState(false);

  // Student Fee Ledger Database with Indian Rupee formatting
  const [studentFeeLedger, setStudentFeeLedger] = useState([
    {
      id: 1,
      studentId: 1,
      studentName: 'Aarav Sharma',
      admissionNo: 'ADM-2024-001',
      roll: 101,
      grade: 'Grade 6-A',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&q=80',
      totalFee: 40500,
      paidAmount: 36000,
      pendingBalance: 4500,
      status: 'Pending', // 'Paid' | 'Pending' | 'Overdue'
      lastPaymentDate: '12 May 2026',
      dueDate: '20 Oct 2026',
      receiptNo: 'REC-2026-9041',
      paymentHistory: [
        { txnId: 'TXN-901', term: 'Term 1 Tuition & Annual', amount: 12000, date: '15 Apr 2026', mode: 'NetBanking (UPI)', status: 'Success' },
        { txnId: 'TXN-908', term: 'Term 2 Tuition & Labs', amount: 12000, date: '12 Jul 2026', mode: 'HDFC Direct UPI', status: 'Success' },
        { txnId: 'TXN-915', term: 'Quarterly Bus Transport', amount: 12000, date: '10 Aug 2026', mode: 'Credit Card', status: 'Success' },
      ],
      breakdown: {
        tuition: 3200,
        labComputer: 800,
        transport: 500,
      }
    },
    {
      id: 2,
      studentId: 2,
      studentName: 'Ananya Verma',
      admissionNo: 'ADM-2024-002',
      roll: 102,
      grade: 'Grade 6-A',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&q=80',
      totalFee: 40500,
      paidAmount: 40500,
      pendingBalance: 0,
      status: 'Paid',
      lastPaymentDate: '14 Oct 2026',
      dueDate: 'Cleared',
      receiptNo: 'REC-2026-9042',
      paymentHistory: [
        { txnId: 'TXN-902', term: 'Term 1 Tuition', amount: 12000, date: '10 Apr 2026', mode: 'UPI QR', status: 'Success' },
        { txnId: 'TXN-909', term: 'Term 2 & Transport', amount: 16500, date: '15 Jul 2026', mode: 'Debit Card', status: 'Success' },
        { txnId: 'TXN-916', term: 'Term 3 Advance Tuition', amount: 12000, date: '14 Oct 2026', mode: 'Credit Card', status: 'Success' },
      ],
      breakdown: {
        tuition: 3000,
        labComputer: 1000,
        transport: 500,
      }
    },
    {
      id: 3,
      studentId: 3,
      studentName: 'Dev Patel',
      admissionNo: 'ADM-2024-003',
      roll: 103,
      grade: 'Grade 6-A',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
      totalFee: 40500,
      paidAmount: 24000,
      pendingBalance: 16500,
      status: 'Overdue',
      lastPaymentDate: '10 Jun 2026',
      dueDate: '30 Sep 2026',
      receiptNo: 'REC-2026-9043',
      paymentHistory: [
        { txnId: 'TXN-903', term: 'Term 1 Tuition', amount: 12000, date: '05 Apr 2026', mode: 'HDFC Direct', status: 'Success' },
        { txnId: 'TXN-910', term: 'Lab & Activity Fees', amount: 12000, date: '10 Jun 2026', mode: 'UPI QR', status: 'Success' },
      ],
      breakdown: {
        tuition: 12000,
        labComputer: 2500,
        transport: 2000,
      }
    },
    {
      id: 4,
      studentId: 4,
      studentName: 'Rita Sharma',
      admissionNo: 'ADM-2023-088',
      roll: 24,
      grade: 'Class 4-B',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&q=80',
      totalFee: 32000,
      paidAmount: 32000,
      pendingBalance: 0,
      status: 'Paid',
      lastPaymentDate: '01 Oct 2026',
      dueDate: 'Cleared',
      receiptNo: 'REC-2026-9044',
      paymentHistory: [
        { txnId: 'TXN-904', term: 'Primary Tuition Term 1', amount: 16000, date: '12 Apr 2026', mode: 'NetBanking', status: 'Success' },
        { txnId: 'TXN-911', term: 'Primary Tuition Term 2 & Arts', amount: 16000, date: '01 Oct 2026', mode: 'UPI GPay', status: 'Success' },
      ],
      breakdown: {
        tuition: 2800,
        labComputer: 500,
        transport: 400,
      }
    },
    {
      id: 5,
      studentId: 5,
      studentName: 'Rohan Sharma',
      admissionNo: 'ADM-2022-042',
      roll: 12,
      grade: 'Class 7-A',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&q=80',
      totalFee: 42000,
      paidAmount: 36000,
      pendingBalance: 6000,
      status: 'Pending',
      lastPaymentDate: '15 Aug 2026',
      dueDate: '25 Oct 2026',
      receiptNo: 'REC-2026-9045',
      paymentHistory: [
        { txnId: 'TXN-905', term: 'Junior High Tuition Q1', amount: 18000, date: '08 Apr 2026', mode: 'Debit Card', status: 'Success' },
        { txnId: 'TXN-912', term: 'Junior High Tuition Q2', amount: 18000, date: '15 Aug 2026', mode: 'UPI QR', status: 'Success' },
      ],
      breakdown: {
        tuition: 4500,
        labComputer: 1000,
        transport: 500,
      }
    },
    {
      id: 6,
      studentId: 6,
      studentName: 'Jyoti Sharma',
      admissionNo: 'ADM-2025-014',
      roll: 8,
      grade: 'KG-II',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80',
      totalFee: 28000,
      paidAmount: 28000,
      pendingBalance: 0,
      status: 'Paid',
      lastPaymentDate: '28 Aug 2026',
      dueDate: 'Cleared',
      receiptNo: 'REC-2026-9046',
      paymentHistory: [
        { txnId: 'TXN-906', term: 'Kindergarten Annual Pack', amount: 28000, date: '28 Aug 2026', mode: 'Credit Card', status: 'Success' },
      ],
      breakdown: {
        tuition: 2200,
        labComputer: 300,
        transport: 0,
      }
    },
    {
      id: 7,
      studentId: 7,
      studentName: 'Ishaan Gupta',
      admissionNo: 'ADM-2024-007',
      roll: 104,
      grade: 'Grade 6-A',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
      totalFee: 40500,
      paidAmount: 40500,
      pendingBalance: 0,
      status: 'Paid',
      lastPaymentDate: '12 Oct 2026',
      dueDate: 'Cleared',
      receiptNo: 'REC-2026-9047',
      paymentHistory: [
        { txnId: 'TXN-907', term: 'Full Year Advance & Lab Kit', amount: 40500, date: '12 Oct 2026', mode: 'UPI QR', status: 'Success' },
      ],
      breakdown: {
        tuition: 3200,
        labComputer: 800,
        transport: 500,
      }
    },
    {
      id: 8,
      studentId: 8,
      studentName: 'Rohan Mehra',
      admissionNo: 'ADM-2024-010',
      roll: 106,
      grade: 'Grade 6-A',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80',
      totalFee: 40500,
      paidAmount: 20000,
      pendingBalance: 20500,
      status: 'Overdue',
      lastPaymentDate: '05 May 2026',
      dueDate: '15 Sep 2026',
      receiptNo: 'REC-2026-9048',
      paymentHistory: [
        { txnId: 'TXN-914', term: 'Term 1 Partial Payment', amount: 20000, date: '05 May 2026', mode: 'Cash Deposit', status: 'Success' },
      ],
      breakdown: {
        tuition: 16000,
        labComputer: 2500,
        transport: 2000,
      }
    }
  ]);

  // Universal Mobile Report-Card Hub State
  const [reportCardTerm, setReportCardTerm] = useState('First Term 2023-2024'); // 'First Term 2023-2024' | 'Mid-Term 2023-2024' | 'Final Term 2023-2024'
  const [selectedStudentForReport, setSelectedStudentForReport] = useState(null);
  const [a4ReportPreviewVisible, setA4ReportPreviewVisible] = useState(false);
  const [reportCardTeacherRemarks, setReportCardTeacherRemarks] = useState({
    1: 'Aarav demonstrates excellent analytical prowess in Computer Studies and Mathematics. Consistent performance and active participation in class discussions.',
    2: 'Ananya is an articulate student with outstanding literature skills. Good diligence and discipline shown throughout the term.',
    3: 'Dev shows consistent progress in lab practicals. Needs extra focus on geometry theorems and daily homework submissions.',
    4: 'Rita is an exceptionally talented and creative student. Commendable performance across all core subjects and fine arts.',
    5: 'Rohan has shown strong academic consistency in Sciences and Social Studies. Keep maintaining high problem-solving standards.',
    6: 'Jyoti is a bright and enthusiastic learner. Participates eagerly in all school activities and foundational phonics.',
    7: 'Ishaan has achieved top honors in Mathematics and Computer Studies. Exemplary academic conduct.',
    8: 'Rohan has good potential. Regular attendance and timely submissions will significantly boost his second term grade.',
  });

  // Student Report Cards Dataset matching the user attached design exactly
  const [studentReportCardData, setStudentReportCardData] = useState({
    1: {
      studentName: 'Aarav Sharma',
      admissionNo: 'ADM-2024-001',
      roll: '101',
      grade: 'Grade 6-A',
      examName: 'First Term Examination 2023-2024',
      academicYear: '2023-2024',
      rank: '3rd',
      result: 'PASSED',
      gradeAwarded: 'B',
      overallPct: 55,
      obtainedMarks: 246,
      maxMarks: 450,
      subjects: [
        { code: 'COM', name: 'Computer Studies', term: 'First Term', score: '45.0/50', pct: 90, avg: '2.8 avg', status: 'PASSED', grade: 'A+', color: '#10B981', headerBg: '#1E3A8A' },
        { code: 'ENG', name: 'Eng. Literature', term: 'First Term', score: '58.0/100', pct: 58, avg: '4.9 avg', status: 'PASSED', grade: 'B', color: '#F97316', headerBg: '#EA580C' },
        { code: 'MTH', name: 'Mathematics', term: 'First Term', score: '48.0/50', pct: 96, avg: '1.2 avg', status: 'PASSED', grade: 'A+', color: '#10B981', headerBg: '#059669' },
        { code: 'SCI', name: 'General Science', term: 'First Term', score: '52.0/100', pct: 52, avg: '3.4 avg', status: 'PASSED', grade: 'C+', color: '#F59E0B', headerBg: '#D97706' },
        { code: 'SST', name: 'Social Studies', term: 'First Term', score: '43.0/50', pct: 86, avg: '2.1 avg', status: 'PASSED', grade: 'A', color: '#10B981', headerBg: '#2563EB' },
      ],
      attendance: '94.8%',
      principalRemarks: 'Promoted with Good Standing. Keep up the enthusiasm!',
    },
    4: {
      studentName: 'Rita Sharma',
      admissionNo: 'ADM-2023-088',
      roll: '24',
      grade: 'Class 4-B',
      examName: 'First Term Examination 2023-2024',
      academicYear: '2023-2024',
      rank: '4th',
      result: 'PASSED',
      gradeAwarded: 'A',
      overallPct: 92,
      obtainedMarks: 414,
      maxMarks: 450,
      subjects: [
        { code: 'COM', name: 'Computer Basics', term: 'First Term', score: '48.0/50', pct: 96, avg: '1.4 avg', status: 'PASSED', grade: 'A+', color: '#10B981', headerBg: '#1E3A8A' },
        { code: 'ENG', name: 'English Grammar', term: 'First Term', score: '92.0/100', pct: 92, avg: '2.1 avg', status: 'PASSED', grade: 'A+', color: '#10B981', headerBg: '#EA580C' },
        { code: 'MTH', name: 'Mathematics', term: 'First Term', score: '47.0/50', pct: 94, avg: '1.8 avg', status: 'PASSED', grade: 'A+', color: '#10B981', headerBg: '#059669' },
        { code: 'SCI', name: 'Nature & Science', term: 'First Term', score: '91.0/100', pct: 91, avg: '2.6 avg', status: 'PASSED', grade: 'A+', color: '#10B981', headerBg: '#D97706' },
        { code: 'ART', name: 'Drawing & Crafts', term: 'First Term', score: '46.0/50', pct: 92, avg: '1.5 avg', status: 'PASSED', grade: 'A+', color: '#10B981', headerBg: '#2563EB' },
      ],
      attendance: '83.33%',
      principalRemarks: 'Superb academic flair and exemplary conduct.',
    }
  });


  const showAlert = (title, message) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleSignIn = () => {
    if (Platform.OS !== 'web') {
      Keyboard.dismiss();
    }
    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    if (!cleanUsername) {
      showAlert('Required', `Please enter your ${loginRole} username or ID.`);
      return;
    }
    if (!cleanPassword) {
      showAlert('Required', 'Please enter your password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setUserRole(loginRole);

      if (loginRole === 'parent') {
        setCurrentScreen('parent_dashboard');
        setParentActiveTab('Home');
        setParentSubScreen('home');
        showAlert('Parent Login Successful', 'Welcome back, Madhuri Sharma! Rita & Rohan\'s school updates, diary, attendance, and fees are ready.');
      } else if (loginRole === 'teacher') {
        setCurrentScreen('teacher');
        setTeacherActiveTab('Home');
        showAlert('Teacher Login Successful', 'Welcome back, Mrs. Sarah Jenkins! You have full access to Attendance, Grading, Timetable, and AI Copilot.');
      } else if (loginRole === 'admin') {
        setCurrentScreen('edusphere_admin');
        setAdminActiveTab('Dashboard');
        showAlert('Admin Login Successful', 'Welcome Dr. Rajesh Khanna! EduSphere Admin command center is live.');
      } else {
        // student
        setCurrentScreen('dashboard');
        setActiveTab('Home');
        showAlert('Student Login Successful', 'Welcome back, Aarav Sharma! Your timetable, homework, bus tracking, and fees are ready.');
      }
    }, 600);
  };

  const handlePinPress = (digit) => {
    if (pinCode.length < 4) {
      const nextPin = pinCode + digit;
      setPinCode(nextPin);
      if (nextPin.length === 4) {
        setTimeout(() => {
          setDialpadModalVisible(false);
          setPinCode('');
          setUserRole(loginRole);
          if (loginRole === 'parent') {
            setCurrentScreen('parent_dashboard');
            setParentActiveTab('Home');
            setParentSubScreen('home');
          } else if (loginRole === 'teacher') {
            setCurrentScreen('teacher');
            setTeacherActiveTab('Home');
          } else if (loginRole === 'admin') {
            setCurrentScreen('edusphere_admin');
            setAdminActiveTab('Dashboard');
          } else {
            setCurrentScreen('dashboard');
            setActiveTab('Home');
          }
        }, 300);
      }
    }
  };

  const handlePinBackspace = () => {
    setPinCode((prev) => prev.slice(0, -1));
  };

  const handleForgotPassword = () => {
    const cleanEmail = forgotEmail.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      showAlert('Invalid Email', 'Please enter a valid recovery email address.');
      return;
    }
    setForgotModalVisible(false);
    setForgotEmail('');
    showAlert('Password Reset Link Sent', `Instructions sent to ${cleanEmail}.`);
  };

  // Reusable subpage header
  const renderSubpageHeader = (title) => (
    <View style={styles.subpageHeader}>
      <SafeAreaView>
        <View style={styles.subpageHeaderBar}>
          <SchoolHoxLogo />
          <TouchableOpacity
            style={styles.bellBadgeButton}
            onPress={() => {
              setCurrentScreen('notifications');
              setActiveTab('Notifications');
            }}
          >
            <Ionicons name="notifications-outline" size={20} color="#FFFFFF" />
            <View style={styles.redDot} />
          </TouchableOpacity>
        </View>

        <View style={styles.subpageNavRow}>
          <TouchableOpacity
            style={styles.roundBackBtn}
            onPress={() => {
              if (userRole === 'admin') {
                setCurrentScreen('edusphere_admin');
                setAdminActiveTab('Dashboard');
              } else {
                setCurrentScreen('dashboard');
                setActiveTab('Home');
              }
            }}
          >
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.subpageNavTitle}>{title}</Text>
          <View style={{ width: 36 }} />
        </View>
      </SafeAreaView>
    </View>
  );

  // ==========================================
  // SCREEN 1: LOGIN (SCHOOLBOOK)
  // ==========================================
  const renderLoginScreen = () => {
    const activeConfig = ROLE_CONFIGS[loginRole];

    const handleSelectRole = (roleKey) => {
      setLoginRole(roleKey);
      setUsername(ROLE_CONFIGS[roleKey].defaultUser);
      setPassword(ROLE_CONFIGS[roleKey].defaultPass);
    };

    const cardContent = (
      <View style={styles.loginCard}>
        {/* Role Selection Segmented Bar */}
        <View style={styles.loginRoleSelector}>
          {[
            { key: 'student', label: 'Student', icon: 'school-outline' },
            { key: 'parent', label: 'Parent', icon: 'people-outline' },
            { key: 'teacher', label: 'Teacher', icon: 'person-outline' },
            { key: 'admin', label: 'Admin', icon: 'shield-checkmark-outline' },
          ].map((r) => {
            const isSelected = loginRole === r.key;
            return (
              <TouchableOpacity
                key={r.key}
                style={[styles.loginRoleTab, isSelected && styles.loginRoleTabActive]}
                onPress={() => handleSelectRole(r.key)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={r.icon}
                  size={15}
                  color={isSelected ? '#FFFFFF' : '#64748B'}
                  style={{ marginRight: 5 }}
                />
                <Text style={[styles.loginRoleTabText, isSelected && styles.loginRoleTabTextActive]}>
                  {r.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Portal Subtitle Badge */}
        <View style={styles.loginRoleBadgePill}>
          <Text style={styles.loginRoleBadgeText}>{activeConfig.portalTitle}</Text>
        </View>

        <Text style={styles.loginWelcomeText}>
          {loginRole === 'student'
            ? 'Student Sign In'
            : loginRole === 'parent'
            ? 'Parent Portal Sign In'
            : loginRole === 'teacher'
            ? 'Faculty Sign In'
            : 'Administrator Sign In'}
        </Text>

        <View style={styles.loginForm}>
          {/* Username Input */}
          <View style={styles.inputPillContainer}>
            <TextInput
              style={styles.textInputField}
              placeholder={
                loginRole === 'student'
                  ? 'Student Email / ID'
                  : loginRole === 'parent'
                  ? 'Parent Email / ID'
                  : loginRole === 'teacher'
                  ? 'Teacher Email / ID'
                  : 'Admin Email'
              }
              placeholderTextColor="#7D899B"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
              editable={true}
            />
            {username.length > 0 && (
              <TouchableOpacity onPress={() => setUsername('')} style={styles.clearIconWrap}>
                <Ionicons name="close-circle" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>

          {/* Password Input */}
          <View style={styles.inputPillContainer}>
            <TextInput
              style={[styles.textInputField, { paddingRight: 45 }]}
              placeholder="Password"
              placeholderTextColor="#7D899B"
              secureTextEntry={secureText}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              editable={true}
            />
            <TouchableOpacity
              style={styles.eyeIconWrap}
              onPress={() => setSecureText(!secureText)}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Ionicons
                name={secureText ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

          {/* Quick actions */}
          <View style={styles.loginRowActions}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.loginDialButton}
              onPress={() => setDialpadModalVisible(true)}
            >
              <DialpadIcon />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setForgotModalVisible(true)}
            >
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.loginSignInButton, isLoading && { opacity: 0.8 }]}
            onPress={handleSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.signInButtonText}>Sign in</Text>
            )}
          </TouchableOpacity>

          {/* Privacy Policy */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.privacyLinkWrap}
            onPress={() => setPrivacyModalVisible(true)}
          >
            <Text style={styles.privacyLinkText}>Privacy policy</Text>
          </TouchableOpacity>
        </View>
      </View>
    );

    return (
      <View style={styles.phoneFrame}>
        <LinearGradient
          colors={['#1c0c66', '#26127b', '#30168f', '#2a1175']}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 0.8, y: 1 }}
          style={styles.loginHeaderGradient}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.loginTopBar}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.loginLangButton}
                onPress={() => setLangModalVisible(true)}
              >
                <Text style={styles.loginLangText}>{selectedLang}</Text>
                <Ionicons name="chevron-down" size={13} color="rgba(255,255,255,0.7)" style={{ marginLeft: 3 }} />
              </TouchableOpacity>
            </View>

            <View style={styles.loginHeaderContent}>
              <SchoolbookLogo />
            </View>
          </SafeAreaView>
        </LinearGradient>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.loginCardContainer}
        >
          {Platform.OS === 'web' ? (
            cardContent
          ) : (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              {cardContent}
            </TouchableWithoutFeedback>
          )}
        </KeyboardAvoidingView>
      </View>
    );
  };

  // ==========================================
  // SCREEN 2: SCHOOLHOX MAIN STUDENT DASHBOARD
  // ==========================================
  const renderDashboardScreen = () => {
    // 1. Today's Student Timetable
    const studentTimetable = [
      {
        id: 1,
        time: '08:30 – 09:20 AM',
        subject: 'Mathematics',
        room: 'Room 204',
        teacher: 'Mrs. Sarah Jenkins',
        status: 'Completed',
        color: '#2563EB',
        bg: '#EFF6FF',
        icon: 'calculator-outline',
      },
      {
        id: 2,
        time: '09:30 – 10:15 AM',
        subject: 'Science (Physics)',
        room: 'Lab 2',
        teacher: 'Dr. Robert Allen',
        status: 'In Progress',
        color: '#10B981',
        bg: '#ECFDF5',
        icon: 'flask-outline',
      },
      {
        id: 3,
        time: '10:30 – 11:15 AM',
        subject: 'English Literature',
        room: 'Room 105',
        teacher: 'Ms. Elizabeth Stone',
        status: 'Upcoming',
        color: '#8B5CF6',
        bg: '#F5F3FF',
        icon: 'book-outline',
      },
      {
        id: 4,
        time: '11:45 – 12:30 PM',
        subject: 'World History',
        room: 'Room 208',
        teacher: 'Mr. David Clark',
        status: 'Upcoming',
        color: '#F59E0B',
        bg: '#FFFBEB',
        icon: 'earth-outline',
      },
    ];

    // 2. Homework Checklist Items
    const homeworkItems = [
      {
        id: 'maths',
        subject: 'Mathematics',
        title: 'Exercise 5.2 — Fractions & Decimals (Q1 to Q14)',
        deadline: 'Tomorrow, 08:30 AM',
        icon: 'calculator-outline',
        color: '#2563EB',
        bg: '#EFF6FF',
      },
      {
        id: 'science',
        subject: 'Science',
        title: 'Draw & label neat Plant & Animal Cell diagrams in lab manual',
        deadline: 'Tomorrow, 09:30 AM',
        icon: 'flask-outline',
        color: '#10B981',
        bg: '#ECFDF5',
      },
      {
        id: 'history',
        subject: 'History',
        title: 'Read Chapter 4: Industrial Revolution and answer textbook questions',
        deadline: 'Friday, 11:00 AM',
        icon: 'earth-outline',
        color: '#F59E0B',
        bg: '#FFFBEB',
      },
      {
        id: 'english',
        subject: 'English',
        title: 'Write 250-word essay on "Climate Change and Renewable Energy"',
        deadline: 'Submitted on time',
        icon: 'book-outline',
        color: '#8B5CF6',
        bg: '#F5F3FF',
      },
    ];

    // 3. Upcoming Examinations with Deadlines
    const studentUpcomingExams = [
      {
        id: 1,
        title: 'Unit Test 2 — Mathematics',
        date: '20 Oct 2026',
        daysLeft: '6 Days Left',
        syllabus: 'Algebra, Decimals, Fractions & Basic Geometry',
        hall: 'Exam Hall A (Seat 14)',
        color: '#2563EB',
        bg: '#EFF6FF',
      },
      {
        id: 2,
        title: 'Science Practical Assessment',
        date: '24 Oct 2026',
        daysLeft: '10 Days Left',
        syllabus: 'Microscopic slides preparation & Ohm\'s Law verification',
        hall: 'Physics & Bio Lab',
        color: '#10B981',
        bg: '#ECFDF5',
      },
      {
        id: 3,
        title: 'Term 1 Final Examination',
        date: '15 Nov 2026',
        daysLeft: '1 Month Left',
        syllabus: 'Complete Term 1 Syllabus across all subjects',
        hall: 'Main Auditorium',
        color: '#8B5CF6',
        bg: '#F5F3FF',
      },
    ];

    // 4. Learning Materials
    const studentMaterials = [
      {
        id: 1,
        title: 'Algebra Formulae Cheat-Sheet',
        subject: 'Mathematics',
        type: 'PDFs',
        size: '1.4 MB',
        date: 'Updated Yesterday',
        color: '#2563EB',
        icon: 'document-text-outline',
      },
      {
        id: 2,
        title: 'Light & Optics Illustrated Notes',
        subject: 'Science',
        type: 'Notes',
        size: '3.8 MB',
        date: 'Added 12 Oct',
        color: '#10B981',
        icon: 'reader-outline',
      },
      {
        id: 3,
        title: 'French Revolution Mindmap',
        subject: 'History',
        type: 'PDFs',
        size: '2.1 MB',
        date: 'Added 10 Oct',
        color: '#F59E0B',
        icon: 'map-outline',
      },
      {
        id: 4,
        title: 'Photosynthesis Video Lecture (4K)',
        subject: 'Science',
        type: 'Videos',
        size: '18 mins',
        date: 'Interactive Video',
        color: '#EF4444',
        icon: 'videocam-outline',
      },
    ];

    const filteredMaterials = studentMaterials.filter(
      (m) => studentMaterialFilter === 'All' || m.type === studentMaterialFilter
    );

    // 5. Recent Marks & Performance
    const recentMarksList = [
      { id: 1, subject: 'Mathematics', exam: 'Weekly Quiz 4', score: 24, total: 25, grade: 'A+', trend: '+2', color: '#2563EB' },
      { id: 2, subject: 'Science (Physics)', exam: 'Lab Experiment 2', score: 19, total: 20, grade: 'A', trend: '+1', color: '#10B981' },
      { id: 3, subject: 'English Grammar', exam: 'Unit Test 1', score: 46, total: 50, grade: 'A', trend: '+4', color: '#8B5CF6' },
      { id: 4, subject: 'World History', exam: 'Map & Quiz Test', score: 18, total: 20, grade: 'A', trend: '0', color: '#F59E0B' },
    ];

    const completedHomeworkCount = Object.values(homeworkDone).filter(Boolean).length;
    const totalHomeworkCount = homeworkItems.length;
    const homeworkPercent = Math.round((completedHomeworkCount / totalHomeworkCount) * 100);

    return (
      <View style={styles.phoneFrame}>
        <ScrollView
          style={styles.screenScrollView}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Cobalt Blue Header */}
          <View style={styles.dashHeaderContainer}>
            <SafeAreaView>
              {/* Brand and Notification */}
              <View style={styles.dashHeaderBar}>
                <SchoolHoxLogo />
                <TouchableOpacity
                  style={styles.bellBadgeButton}
                  onPress={() => {
                    setCurrentScreen('notifications');
                    setActiveTab('Notifications');
                  }}
                >
                  <Ionicons name="notifications-outline" size={20} color="#FFFFFF" />
                  <View style={styles.redDot} />
                </TouchableOpacity>
              </View>

              {/* Greeting with Motivation */}
              <Text style={styles.greetingTitle}>
                Good morning, Aarav 👋
              </Text>
              <Text style={{ fontSize: 12, color: '#93C5FD', fontWeight: '500', marginTop: 2, marginBottom: 12 }}>
                "Success is the sum of small efforts, repeated day in and day out." 🌟
              </Text>

              {/* Profile Card */}
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.studentCard}
                onPress={() => setProfileModalVisible(true)}
              >
                <StudentAvatar />
                <View style={styles.studentInfoWrap}>
                  <Text style={styles.studentName}>Aarav Sharma</Text>
                  <Text style={styles.studentClass}>Class 6-A • Roll No. 14 • House: Blue</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
              </TouchableOpacity>
            </SafeAreaView>
          </View>

          {/* Curved Surface Body */}
          <View style={styles.dashBodyContainer}>
            {/* 2x2 Metric Cards Grid */}
            <View style={styles.statsGrid}>
              {/* 1. Attendance Card */}
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.statCard}
                onPress={() => {
                  setCurrentScreen('attendance');
                  setActiveTab('Attendance');
                }}
              >
                <View style={styles.statCardRow}>
                  <View style={[styles.statIconCircle, { backgroundColor: '#3855E5' }]}>
                    <Ionicons name="people" size={18} color="#FFFFFF" />
                  </View>
                  <View style={styles.statTextWrap}>
                    <Text style={styles.statLabel}>Attendance</Text>
                    <Text style={styles.statValue}>96.4%</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#94A3B8" style={{ marginLeft: 'auto' }} />
                </View>
              </TouchableOpacity>

              {/* 2. Fees Due Card */}
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.statCard}
                onPress={() => {
                  setCurrentScreen('fees');
                  setActiveTab('Fees');
                }}
              >
                <View style={styles.statCardRow}>
                  <View style={[styles.statIconCircle, { backgroundColor: '#F59E0B' }]}>
                    <Text style={styles.rupeeIcon}>₹</Text>
                  </View>
                  <View style={styles.statTextWrap}>
                    <Text style={styles.statLabel}>Fees Due</Text>
                    <Text style={[styles.statValue, { color: isFeePaid ? '#10B981' : '#E17100' }]}>
                      {isFeePaid ? 'Paid' : '₹4,500'}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#94A3B8" style={{ marginLeft: 'auto' }} />
                </View>
              </TouchableOpacity>

              {/* 3. Homework Card */}
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.statCard}
                onPress={() => {
                  setCurrentScreen('homework');
                  setActiveTab('Homework');
                }}
              >
                <View style={styles.statCardRow}>
                  <View style={[styles.statIconCircle, { backgroundColor: '#3B82F6' }]}>
                    <Ionicons name="book" size={18} color="#FFFFFF" />
                  </View>
                  <View style={styles.statTextWrap}>
                    <Text style={styles.statLabel}>Homework</Text>
                    <Text style={styles.statValue}>
                      {totalHomeworkCount - completedHomeworkCount} Due
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#94A3B8" style={{ marginLeft: 'auto' }} />
                </View>
              </TouchableOpacity>

              {/* 4. Bus Live Card */}
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.statCard}
                onPress={() => setCurrentScreen('bus')}
              >
                <View style={styles.statCardRow}>
                  <View style={[styles.statIconCircle, { backgroundColor: '#10B981' }]}>
                    <Ionicons name="bus" size={18} color="#FFFFFF" />
                  </View>
                  <View style={styles.statTextWrap}>
                    <Text style={styles.statLabel}>Bus Live</Text>
                    <Text style={[styles.statValue, { color: '#10B981' }]}>Live</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#94A3B8" style={{ marginLeft: 'auto' }} />
                </View>
              </TouchableOpacity>
            </View>

            {/* STUDENT QUICK ACCESS PORTALS (CLEAN BUTTONS THAT OPEN SEPARATE SCREENS) */}
            <View style={{ marginTop: 18, marginBottom: 6 }}>
              <Text style={styles.studentSectionHeaderTitle}>STUDY & ACADEMIC PORTALS</Text>
              <Text style={styles.studentSectionHeaderSub}>Tap any section below to open its dedicated workspace</Text>
            </View>

            <View style={styles.studentPortalsGrid}>
              {/* 1. Today's Timetable Button */}
              <TouchableOpacity
                style={styles.studentPortalBtnCard}
                activeOpacity={0.85}
                onPress={() => setCurrentScreen('student_timetable')}
              >
                <View style={[styles.studentPortalIconCircle, { backgroundColor: '#EFF6FF' }]}>
                  <Ionicons name="time" size={24} color="#2563EB" />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.studentPortalBtnTitle}>Today's Timetable</Text>
                  <Text style={styles.studentPortalBtnSub}>4 Classes Scheduled • Next: Science Lab</Text>
                </View>
                <View style={styles.studentPortalArrowWrap}>
                  <Ionicons name="chevron-forward" size={18} color="#2563EB" />
                </View>
              </TouchableOpacity>

              {/* 2. Homework Checklist Button */}
              <TouchableOpacity
                style={styles.studentPortalBtnCard}
                activeOpacity={0.85}
                onPress={() => setCurrentScreen('student_checklist')}
              >
                <View style={[styles.studentPortalIconCircle, { backgroundColor: '#ECFDF5' }]}>
                  <Ionicons name="checkmark-done" size={24} color="#10B981" />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.studentPortalBtnTitle}>Homework Checklist</Text>
                  <Text style={styles.studentPortalBtnSub}>
                    {totalHomeworkCount - completedHomeworkCount} Pending Tasks • {homeworkPercent}% Completed
                  </Text>
                </View>
                <View style={styles.studentPortalArrowWrap}>
                  <Ionicons name="chevron-forward" size={18} color="#10B981" />
                </View>
              </TouchableOpacity>

              {/* 3. Upcoming Exams & Hall Tickets Button */}
              <TouchableOpacity
                style={styles.studentPortalBtnCard}
                activeOpacity={0.85}
                onPress={() => setCurrentScreen('student_exams')}
              >
                <View style={[styles.studentPortalIconCircle, { backgroundColor: '#EEF2FF' }]}>
                  <Ionicons name="calendar-outline" size={24} color="#6366F1" />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.studentPortalBtnTitle}>Upcoming Exams</Text>
                  <Text style={styles.studentPortalBtnSub}>Unit Test 2 in 6 Days • Hall Ticket Issued</Text>
                </View>
                <View style={styles.studentPortalArrowWrap}>
                  <Ionicons name="chevron-forward" size={18} color="#6366F1" />
                </View>
              </TouchableOpacity>

              {/* 4. Learning Materials & Digital Notes Button */}
              <TouchableOpacity
                style={styles.studentPortalBtnCard}
                activeOpacity={0.85}
                onPress={() => setCurrentScreen('student_materials')}
              >
                <View style={[styles.studentPortalIconCircle, { backgroundColor: '#F0FDF4' }]}>
                  <Ionicons name="library" size={24} color="#16A34A" />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.studentPortalBtnTitle}>Learning Materials</Text>
                  <Text style={styles.studentPortalBtnSub}>PDFs, Notes & Video Lectures • Offline Available</Text>
                </View>
                <View style={styles.studentPortalArrowWrap}>
                  <Ionicons name="chevron-forward" size={18} color="#16A34A" />
                </View>
              </TouchableOpacity>

              {/* 5. Recent Marks & Report Card Button */}
              <TouchableOpacity
                style={styles.studentPortalBtnCard}
                activeOpacity={0.85}
                onPress={() => setCurrentScreen('student_marks')}
              >
                <View style={[styles.studentPortalIconCircle, { backgroundColor: '#FFFBEB' }]}>
                  <Ionicons name="trophy" size={24} color="#D97706" />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.studentPortalBtnTitle}>Recent Marks & Scores</Text>
                  <Text style={styles.studentPortalBtnSub}>Term 1 Average: 93.2% • 4 Tests Evaluated</Text>
                </View>
                <View style={styles.studentPortalArrowWrap}>
                  <Ionicons name="chevron-forward" size={18} color="#D97706" />
                </View>
              </TouchableOpacity>

              {/* 6. View Personal Student Details Button */}
              <TouchableOpacity
                style={styles.studentPortalBtnCard}
                activeOpacity={0.85}
                onPress={() => {
                  const studentMe = masterStudentsList.find((s) => s.name === 'Aarav Sharma') || masterStudentsList[0];
                  setSelectedStudentForDetail(studentMe);
                  setStudentDetailModalVisible(true);
                }}
              >
                <View style={[styles.studentPortalIconCircle, { backgroundColor: '#F0FDF4' }]}>
                  <Ionicons name="person-circle" size={24} color="#059669" />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.studentPortalBtnTitle}>My Student Profile & Records</Text>
                  <Text style={styles.studentPortalBtnSub}>ADM-2024-001 • Guardian, Attendance & History</Text>
                </View>
                <View style={[styles.studentPortalArrowWrap, { backgroundColor: '#ECFDF5' }]}>
                  <Ionicons name="chevron-forward" size={18} color="#059669" />
                </View>
              </TouchableOpacity>
            </View>

            {/* Smart Diary Section Banner */}
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.smartDiaryBannerCard}
              onPress={() => {
                setCurrentScreen('smartdiary');
                setDiarySubTab('Schedule');
              }}
            >
              <View style={styles.smartDiaryBannerContent}>
                <View style={styles.smartDiaryBannerIcon}>
                  <Ionicons name="calendar" size={22} color="#FFFFFF" />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.smartDiaryBannerTitle}>Smart Diary & Schedule</Text>
                    <View style={styles.smartDiaryBadge}>
                      <Text style={styles.smartDiaryBadgeText}>Live Timetable & Grades</Text>
                    </View>
                  </View>
                  <Text style={styles.smartDiaryBannerSubtitle}>
                    Schedule • Franz Kafka • World Literature • Grades
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#4F46E5" />
              </View>
            </TouchableOpacity>

            {/* Recent Activity Card */}
            <View style={styles.recentActivityBox}>
              <View style={styles.recentHeaderRow}>
                <Text style={styles.recentHeaderTitle}>Recent Activity</Text>
                <TouchableOpacity onPress={() => setCurrentScreen('attendance')}>
                  <Text style={styles.viewAllBtnText}>View all</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.activityItemRow}
                onPress={() => {
                  setCurrentScreen('homework');
                  setActiveTab('Homework');
                }}
              >
                <View style={[styles.activityCircle, { backgroundColor: '#4F46E5' }]}>
                  <Ionicons name="document-text" size={18} color="#FFFFFF" />
                </View>
                <View style={styles.activityDetailWrap}>
                  <Text style={styles.activityPrimary}>Homework assigned in</Text>
                  <Text style={styles.activitySecondary}>Maths Chapter 5</Text>
                </View>
                <Text style={styles.activityTimestamp}>8:30 AM</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.activityItemRow}
                onPress={() => {
                  setCurrentScreen('attendance');
                  setActiveTab('Attendance');
                }}
              >
                <View style={[styles.activityCircle, { backgroundColor: '#10B981' }]}>
                  <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                </View>
                <View style={styles.activityDetailWrap}>
                  <Text style={styles.activityPrimary}>Attendance marked</Text>
                </View>
                <Text style={styles.activityTimestamp}>8:45 AM</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.activityItemRow}
                onPress={() => {
                  setCurrentScreen('fees');
                  setActiveTab('Fees');
                }}
              >
                <View style={[styles.activityCircle, { backgroundColor: '#F59E0B' }]}>
                  <Text style={styles.rupeeIcon}>₹</Text>
                </View>
                <View style={styles.activityDetailWrap}>
                  <Text style={styles.activityPrimary}>Fees payment due</Text>
                  <Text style={styles.activitySecondary}>₹4,500</Text>
                </View>
                <Text style={styles.activityTimestamp}>Yesterday</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.activityItemRow, { borderBottomWidth: 0 }]}
                onPress={() => setCurrentScreen('bus')}
              >
                <View style={[styles.activityCircle, { backgroundColor: '#2563EB' }]}>
                  <Ionicons name="bus" size={18} color="#FFFFFF" />
                </View>
                <View style={styles.activityDetailWrap}>
                  <Text style={styles.activityPrimary}>Bus arrived at your stop</Text>
                  <Text style={styles.activitySecondary}>Route 12</Text>
                </View>
                <Text style={styles.activityTimestamp}>Yesterday</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {renderTabBar()}
      </View>
    );
  };

  // ==========================================
  // SCREEN 2-A: EDUSPHERE MOBILE ADMIN DASHBOARD
  // ==========================================
  const renderEduSphereAdminScreen = () => {
    // Compact student & teacher stats
    const statsOverview = [
      {
        id: 'students',
        label: 'Total Students',
        count: '1,420',
        sub: '98.2% Active',
        icon: 'school',
        color: '#3B82F6',
        bg: '#EFF6FF',
        trend: '+24 new',
      },
      {
        id: 'teachers',
        label: 'Teaching Faculty',
        count: '86',
        sub: '100% On-duty',
        icon: 'people',
        color: '#10B981',
        bg: '#ECFDF5',
        trend: '4 depts',
      },
      {
        id: 'attendance',
        label: "Today's Attendance",
        count: '94.8%',
        sub: '1,346 Present',
        icon: 'checkmark-circle',
        color: '#6366F1',
        bg: '#EEF2FF',
        trend: '74 absent',
      },
      {
        id: 'fees',
        label: 'Fee Collections',
        count: '₹34.8L',
        sub: '₹4.2L Pending',
        icon: 'wallet',
        color: '#F59E0B',
        bg: '#FFFBEB',
        trend: '89.2% paid',
      },
    ];

    // Upcoming Examinations
    const upcomingExams = [
      {
        id: 1,
        title: 'Mid-Term Examinations 2026',
        grades: 'Grades 6 to 12',
        dates: '20 Oct – 28 Oct',
        status: 'Hall Tickets Issued',
        statusColor: '#10B981',
        statusBg: '#ECFDF5',
        icon: 'clipboard-outline',
      },
      {
        id: 2,
        title: 'Unit Test 2 — Science & Maths',
        grades: 'Grades 8 & 9',
        dates: '02 Nov – 05 Nov',
        status: 'Question Papers Ready',
        statusColor: '#3B82F6',
        statusBg: '#EFF6FF',
        icon: 'flask-outline',
      },
      {
        id: 3,
        title: 'CBSE Pre-Board Practical Exams',
        grades: 'Grade 10 & 12',
        dates: '15 Nov – 22 Nov',
        status: 'External Examiners Assigned',
        statusColor: '#8B5CF6',
        statusBg: '#F5F3FF',
        icon: 'trophy-outline',
      },
    ];

    // Recent School Announcements
    const recentAnnouncements = [
      {
        id: 1,
        title: 'Annual Sports Day & Athletics Meet',
        date: 'Today, 09:30 AM',
        target: 'All Students & Parents',
        body: 'Final schedule published. Track trials start this Thursday.',
        badge: 'Event',
        badgeBg: '#EFF6FF',
        badgeColor: '#2563EB',
      },
      {
        id: 2,
        title: 'Quarterly Staff Academic Council',
        date: 'Yesterday, 04:15 PM',
        target: 'Faculty & Heads of Dept',
        body: 'Curriculum review & digital lesson plan adoption targets met.',
        badge: 'Staff',
        badgeBg: '#ECFDF5',
        badgeColor: '#059669',
      },
      {
        id: 3,
        title: 'School Transport GPS Route Revision',
        date: '12 Oct, 11:00 AM',
        target: 'Bus Commuters & Drivers',
        body: 'Route 12 & Route 8 optimized with 10 mins shorter transit.',
        badge: 'Transport',
        badgeBg: '#FEF3C7',
        badgeColor: '#D97706',
      },
    ];

    return (
      <View style={styles.phoneFrame}>
        <ScrollView
          style={styles.screenScrollView}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Admin Header with EduSphere Brand */}
          <LinearGradient
            colors={['#0F172A', '#1E293B', '#334155']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.adminHeaderGradient}
          >
            <SafeAreaView>
              {/* Top Navigation Row */}
              <View style={styles.adminTopNavRow}>
                <EduSphereLogo />

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity
                    style={styles.adminHeaderActionBtn}
                    onPress={() => {
                      setCurrentScreen('notifications');
                      setActiveTab('Notifications');
                    }}
                  >
                    <Ionicons name="notifications-outline" size={20} color="#FFFFFF" />
                    <View style={styles.redDot} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.adminHeaderActionBtn, { marginLeft: 8 }]}
                    onPress={() => {
                      showAlert('Admin Profile', 'Dr. Rajesh Khanna\nPrincipal & Chief Administrator\nEduSphere Central Command\nSession: 2026-2027');
                    }}
                  >
                    <View style={styles.adminAvatarSmall}>
                      <Ionicons name="shield-checkmark" size={16} color="#F59E0B" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Greeting & Subtitle */}
              <View style={styles.adminGreetingWrap}>
                <View style={styles.adminBadgeRow}>
                  <View style={styles.adminStatusPill}>
                    <View style={styles.adminOnlineDot} />
                    <Text style={styles.adminStatusText}>System Live & Synced</Text>
                  </View>
                  <Text style={styles.adminSessionText}>Academic Year 2026-27</Text>
                </View>
                <Text style={styles.adminGreetingTitle}>Welcome, Principal Khanna 🏛️</Text>
                <Text style={styles.adminGreetingSub}>
                  St. Xavier's International School • Administrative Command Center
                </Text>
              </View>

              {/* Timeframe Selector */}
              <View style={styles.adminTimeframeRow}>
                {['Today', 'This Week', 'This Month'].map((tf) => (
                  <TouchableOpacity
                    key={tf}
                    style={[
                      styles.adminTimeframeBtn,
                      adminTimeframe === tf && styles.adminTimeframeBtnActive,
                    ]}
                    onPress={() => setAdminTimeframe(tf)}
                  >
                    <Text
                      style={[
                        styles.adminTimeframeText,
                        adminTimeframe === tf && styles.adminTimeframeTextActive,
                      ]}
                    >
                      {tf}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </SafeAreaView>
          </LinearGradient>

          {/* Admin Body Container */}
          <View style={styles.adminBodyContainer}>
            {/* Quick Actions Strip */}
            <View style={styles.adminQuickActionsContainer}>
              <Text style={styles.adminSectionTitle}>QUICK MANAGEMENT ACTIONS</Text>
              <View style={styles.adminQuickActionsGrid}>
                <TouchableOpacity
                  style={styles.adminActionCard}
                  activeOpacity={0.8}
                  onPress={() => setAdminBroadcastModal(true)}
                >
                  <View style={[styles.adminActionIconWrap, { backgroundColor: '#EFF6FF' }]}>
                    <Ionicons name="megaphone" size={20} color="#2563EB" />
                  </View>
                  <Text style={styles.adminActionLabel}>Broadcast Alert</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.adminActionCard}
                  activeOpacity={0.8}
                  onPress={() => {
                    setCurrentScreen('admin_faculty');
                    setAdminActiveTab('Faculty');
                  }}
                >
                  <View style={[styles.adminActionIconWrap, { backgroundColor: '#ECFDF5' }]}>
                    <Ionicons name="people" size={20} color="#059669" />
                  </View>
                  <Text style={styles.adminActionLabel}>Faculty Portal</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.adminActionCard}
                  activeOpacity={0.8}
                  onPress={() => {
                    showAlert(
                      'Automated Fee Reminder',
                      'SMS & App notification sent to 28 parents with outstanding Term 2 dues.',
                    );
                    setAdminFeeRemindSent(true);
                  }}
                >
                  <View style={[styles.adminActionIconWrap, { backgroundColor: '#FFFBEB' }]}>
                    <Ionicons name="mail-unread" size={20} color="#D97706" />
                  </View>
                  <Text style={styles.adminActionLabel}>
                    {adminFeeRemindSent ? 'Reminders Sent' : 'Remind Fees'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.adminActionCard}
                  activeOpacity={0.8}
                  onPress={() => {
                    setCurrentScreen('admin_students');
                    setAdminActiveTab('Students');
                  }}
                >
                  <View style={[styles.adminActionIconWrap, { backgroundColor: '#F0FDF4' }]}>
                    <Ionicons name="school" size={20} color="#16A34A" />
                  </View>
                  <Text style={styles.adminActionLabel}>Students Hub</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.adminActionCard}
                  activeOpacity={0.8}
                  onPress={() => {
                    showAlert(
                      'Admin Report Downloaded',
                      'Comprehensive School Performance Summary (PDF) generated successfully.',
                    );
                  }}
                >
                  <View style={[styles.adminActionIconWrap, { backgroundColor: '#F5F3FF' }]}>
                    <Ionicons name="document-text" size={20} color="#7C3AED" />
                  </View>
                  <Text style={styles.adminActionLabel}>Export PDF</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Compact Student & Teacher Statistics Grid */}
            <View style={{ marginTop: 22 }}>
              <Text style={styles.adminSectionTitle}>INSTITUTION OVERVIEW</Text>
              <View style={styles.adminStatsGrid}>
                {statsOverview.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.adminCompactCard}
                    activeOpacity={0.85}
                    onPress={() => {
                      if (item.id === 'teachers') {
                        setCurrentScreen('admin_faculty');
                        setAdminActiveTab('Faculty');
                      } else if (item.id === 'fees') {
                        setCurrentScreen('admin_finance');
                        setAdminActiveTab('Finance');
                      } else if (item.id === 'students') {
                        setCurrentScreen('admin_students');
                        setAdminActiveTab('Students');
                      } else if (item.id === 'attendance') {
                        setCurrentScreen('attendance_hub');
                        setAdminActiveTab('Attendance');
                      }
                    }}
                  >
                    <View style={styles.adminCompactCardTop}>
                      <View style={[styles.adminCardIconBox, { backgroundColor: item.bg }]}>
                        <Ionicons name={item.icon} size={18} color={item.color} />
                      </View>
                      <View style={[styles.adminTrendPill, { backgroundColor: item.bg }]}>
                        <Text style={[styles.adminTrendText, { color: item.color }]}>
                          {item.trend}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.adminCompactCount}>{item.count}</Text>
                    <Text style={styles.adminCompactLabel}>{item.label}</Text>
                    <Text style={styles.adminCompactSub}>{item.sub}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Attendance Summary with Visual Bar Chart */}
            <View style={styles.adminSectionCard}>
              <View style={styles.adminSectionHeaderRow}>
                <View>
                  <Text style={styles.adminCardMainTitle}>Attendance Analytics</Text>
                  <Text style={styles.adminCardSubTitle}>Campus-wide daily presence by grade</Text>
                </View>
                <View style={styles.adminRateBadge}>
                  <Text style={styles.adminRateBadgeText}>94.8% Average</Text>
                </View>
              </View>

              {/* Simple Chart: Weekly attendance distribution */}
              <View style={styles.adminChartContainer}>
                {[
                  { day: 'Mon', rate: 96, count: '1,363' },
                  { day: 'Tue', rate: 94, count: '1,334' },
                  { day: 'Wed', rate: 98, count: '1,391' },
                  { day: 'Thu', rate: 95, count: '1,349' },
                  { day: 'Fri', rate: 91, count: '1,292' },
                ].map((item, idx) => (
                  <View key={idx} style={styles.adminChartColumn}>
                    <Text style={styles.adminChartBarValue}>{item.rate}%</Text>
                    <View style={styles.adminChartTrack}>
                      <View
                        style={[
                          styles.adminChartFillBar,
                          {
                            height: `${item.rate}%`,
                            backgroundColor: idx === 2 ? '#2563EB' : '#93C5FD',
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.adminChartDayLabel}>{item.day}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.adminAttendanceBreakdownRow}>
                <View style={styles.adminBreakdownPill}>
                  <View style={[styles.dotMarker, { backgroundColor: '#10B981' }]} />
                  <Text style={styles.breakdownText}>Students: 95.2% (1,351/1,420)</Text>
                </View>
                <View style={styles.adminBreakdownPill}>
                  <View style={[styles.dotMarker, { backgroundColor: '#3B82F6' }]} />
                  <Text style={styles.breakdownText}>Teachers: 97.6% (84/86)</Text>
                </View>
              </View>
            </View>

            {/* Fee Overview Card */}
            <View style={styles.adminSectionCard}>
              <View style={styles.adminSectionHeaderRow}>
                <View>
                  <Text style={styles.adminCardMainTitle}>Fee Revenue Overview</Text>
                  <Text style={styles.adminCardSubTitle}>Term 1 & Term 2 financial summary</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setCurrentScreen('admin_finance');
                    setAdminActiveTab('Finance');
                  }}
                >
                  <Text style={styles.adminViewDetailsText}>View Ledger →</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.adminFeeMetricsRow}>
                <View style={styles.adminFeeMetricItem}>
                  <Text style={styles.adminFeeMetricLabel}>Total Expected</Text>
                  <Text style={styles.adminFeeMetricVal}>₹39.00 L</Text>
                  <Text style={styles.adminFeeMetricSub}>Full Semester</Text>
                </View>
                <View style={styles.adminFeeDivider} />
                <View style={styles.adminFeeMetricItem}>
                  <Text style={[styles.adminFeeMetricLabel, { color: '#059669' }]}>Collected</Text>
                  <Text style={[styles.adminFeeMetricVal, { color: '#059669' }]}>₹34.80 L</Text>
                  <Text style={styles.adminFeeMetricSub}>89.2% realized</Text>
                </View>
                <View style={styles.adminFeeDivider} />
                <View style={styles.adminFeeMetricItem}>
                  <Text style={[styles.adminFeeMetricLabel, { color: '#D97706' }]}>Outstanding</Text>
                  <Text style={[styles.adminFeeMetricVal, { color: '#D97706' }]}>₹4.20 L</Text>
                  <Text style={styles.adminFeeMetricSub}>28 accounts</Text>
                </View>
              </View>

              {/* Visual Progress Bar */}
              <View style={styles.adminFeeProgressTrack}>
                <View style={[styles.adminFeeProgressFill, { width: '89.2%' }]} />
              </View>
            </View>

            {/* Upcoming Examinations */}
            <View style={styles.adminSectionCard}>
              <View style={styles.adminSectionHeaderRow}>
                <View>
                  <Text style={styles.adminCardMainTitle}>Upcoming Examinations</Text>
                  <Text style={styles.adminCardSubTitle}>Examination schedules and control status</Text>
                </View>
                <Ionicons name="calendar-outline" size={20} color="#64748B" />
              </View>

              <View style={{ marginTop: 12 }}>
                {upcomingExams.map((exam) => (
                  <View key={exam.id} style={styles.adminExamCardItem}>
                    <View style={styles.adminExamIconCircle}>
                      <Ionicons name={exam.icon} size={20} color="#2563EB" />
                    </View>
                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <Text style={styles.adminExamTitle}>{exam.title}</Text>
                      <Text style={styles.adminExamGrades}>
                        {exam.grades} • 📅 {exam.dates}
                      </Text>
                      <View style={[styles.adminExamStatusBadge, { backgroundColor: exam.statusBg }]}>
                        <Text style={[styles.adminExamStatusText, { color: exam.statusColor }]}>
                          ● {exam.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Recent School Announcements */}
            <View style={styles.adminSectionCard}>
              <View style={styles.adminSectionHeaderRow}>
                <View>
                  <Text style={styles.adminCardMainTitle}>Recent Announcements</Text>
                  <Text style={styles.adminCardSubTitle}>Campus circulars & administrative orders</Text>
                </View>
                <TouchableOpacity onPress={() => setAdminBroadcastModal(true)}>
                  <Text style={styles.adminViewDetailsText}>+ Post New</Text>
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: 12 }}>
                {recentAnnouncements.map((ann) => (
                  <View key={ann.id} style={styles.adminAnnouncementItem}>
                    <View style={styles.adminAnnouncementTop}>
                      <View style={[styles.adminAnnBadge, { backgroundColor: ann.badgeBg }]}>
                        <Text style={[styles.adminAnnBadgeText, { color: ann.badgeColor }]}>
                          {ann.badge}
                        </Text>
                      </View>
                      <Text style={styles.adminAnnDate}>{ann.date}</Text>
                    </View>
                    <Text style={styles.adminAnnTitle}>{ann.title}</Text>
                    <Text style={styles.adminAnnBody}>{ann.body}</Text>
                    <Text style={styles.adminAnnTarget}>Target: {ann.target}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={{ height: 28 }} />
          </View>
        </ScrollView>

        {/* Clean Admin Bottom Navigation Bar */}
        {renderAdminTabBar()}
      </View>
    );
  };

  // ==========================================
  // SCREEN 2-B: EDUSPHERE ADMIN FACULTY DIRECTORY (SEPARATE PAGE)
  // ==========================================
  const renderAdminFacultyScreen = () => {
    const facultyList = [
      { id: 1, name: 'Mrs. Sarah Jenkins', dept: 'Mathematics', role: 'Head of Dept & Senior Faculty', classes: 'Grade 6-A, 8-B, 10-A', exp: '12 Yrs', status: 'In Class (Room 204)', statusColor: '#10B981', statusBg: '#ECFDF5', email: 's.jenkins@edusphere.edu', phone: '+91 98230 11223' },
      { id: 2, name: 'Dr. Robert Allen', dept: 'Science', role: 'Physics Professor', classes: 'Grade 9-A, 11-A, 12-B', exp: '15 Yrs', status: 'In Lab 2', statusColor: '#2563EB', statusBg: '#EFF6FF', email: 'r.allen@edusphere.edu', phone: '+91 98230 44556' },
      { id: 3, name: 'Ms. Elizabeth Stone', dept: 'Languages', role: 'English Literature Mentor', classes: 'Grade 7-B, 9-B, 10-B', exp: '8 Yrs', status: 'Staff Room', statusColor: '#8B5CF6', statusBg: '#F5F3FF', email: 'e.stone@edusphere.edu', phone: '+91 98230 77889' },
      { id: 4, name: 'Mr. David Clark', dept: 'Humanities', role: 'Geography & History Head', classes: 'Grade 6-B, 8-A, 11-B', exp: '10 Yrs', status: 'Library duty', statusColor: '#F59E0B', statusBg: '#FFFBEB', email: 'd.clark@edusphere.edu', phone: '+91 98230 99001' },
      { id: 5, name: 'Mrs. Anjali Sen', dept: 'Science', role: 'Biology & Chemistry Teacher', classes: 'Grade 6-A, 7-A, 10-A', exp: '9 Yrs', status: 'In Class (Room 105)', statusColor: '#10B981', statusBg: '#ECFDF5', email: 'a.sen@edusphere.edu', phone: '+91 98230 33445' },
      { id: 6, name: 'Mr. Vikram Mehta', dept: 'Mathematics', role: 'Applied Mathematics & Statistics', classes: 'Grade 11-A, 12-A', exp: '14 Yrs', status: 'Off Duty (Prep Period)', statusColor: '#64748B', statusBg: '#F1F5F9', email: 'v.mehta@edusphere.edu', phone: '+91 98230 66778' },
    ];

    const filteredFaculty = facultyList.filter((f) => {
      const matchDept = adminFacultyFilter === 'All' || f.dept.toLowerCase() === adminFacultyFilter.toLowerCase();
      const matchSearch = !adminFacultySearch.trim() || f.name.toLowerCase().includes(adminFacultySearch.toLowerCase()) || f.dept.toLowerCase().includes(adminFacultySearch.toLowerCase());
      return matchDept && matchSearch;
    });

    return (
      <View style={styles.phoneFrame}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0F172A' }}>
          {/* Subpage Header */}
          <View style={styles.adminFacultyHeader}>
            <TouchableOpacity
              style={styles.adminFacultyBackBtn}
              onPress={() => {
                setCurrentScreen('edusphere_admin');
                setAdminActiveTab('Dashboard');
              }}
            >
              <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.adminFacultyTitle}>Faculty Oversight</Text>
              <Text style={styles.adminFacultySub}>86 Active Staff • 4 Academic Depts</Text>
            </View>
            <TouchableOpacity
              style={styles.adminFacultyAddBtn}
              onPress={() => showAlert('Add Faculty Member', 'Opens new teacher enrollment form.')}
            >
              <Ionicons name="person-add" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.adminFacultyBody}>
            {/* Search Bar */}
            <View style={styles.adminFacultySearchBox}>
              <Ionicons name="search" size={18} color="#94A3B8" style={{ marginRight: 8 }} />
              <TextInput
                style={styles.adminFacultySearchInput}
                placeholder="Search teacher by name or subject..."
                placeholderTextColor="#94A3B8"
                value={adminFacultySearch}
                onChangeText={setAdminFacultySearch}
              />
              {adminFacultySearch.length > 0 && (
                <TouchableOpacity onPress={() => setAdminFacultySearch('')}>
                  <Ionicons name="close-circle" size={16} color="#94A3B8" />
                </TouchableOpacity>
              )}
            </View>

            {/* Department Filter Pills */}
            <View style={styles.adminFacultyFilterRow}>
              {['All', 'Science', 'Maths', 'Languages', 'Humanities'].map((dept) => (
                <TouchableOpacity
                  key={dept}
                  style={[
                    styles.adminFacultyFilterPill,
                    adminFacultyFilter === dept && styles.adminFacultyFilterPillActive,
                  ]}
                  onPress={() => setAdminFacultyFilter(dept)}
                >
                  <Text
                    style={[
                      styles.adminFacultyFilterPillText,
                      adminFacultyFilter === dept && styles.adminFacultyFilterPillTextActive,
                    ]}
                  >
                    {dept}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Faculty List */}
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
              {filteredFaculty.map((item) => (
                <View key={item.id} style={styles.adminFacultyCard}>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <View style={styles.adminFacultyAvatar}>
                      <Text style={styles.adminFacultyAvatarText}>
                        {item.name.split(' ')[1] ? item.name.split(' ')[1][0] : item.name[0]}
                      </Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.adminFacultyName}>{item.name}</Text>
                        <View style={[styles.adminFacultyStatusPill, { backgroundColor: item.statusBg }]}>
                          <Text style={[styles.adminFacultyStatusText, { color: item.statusColor }]}>
                            {item.status}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.adminFacultyRole}>{item.role}</Text>
                      <Text style={styles.adminFacultyClasses}>📚 Assigned: {item.classes}</Text>
                      <View style={styles.adminFacultyContactRow}>
                        <TouchableOpacity
                          style={styles.adminFacultyCallBtn}
                          onPress={() => showAlert(`Call ${item.name}`, `Dialing ${item.phone}...`)}
                        >
                          <Ionicons name="call" size={12} color="#2563EB" style={{ marginRight: 4 }} />
                          <Text style={styles.adminFacultyCallText}>Call</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.adminFacultyCallBtn, { marginLeft: 8 }]}
                          onPress={() => showAlert(`Email ${item.name}`, `Composing message to ${item.email}`)}
                        >
                          <Ionicons name="mail" size={12} color="#475569" style={{ marginRight: 4 }} />
                          <Text style={[styles.adminFacultyCallText, { color: '#475569' }]}>Email</Text>
                        </TouchableOpacity>
                        <Text style={styles.adminFacultyExpText}>Exp: {item.exp}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
              <View style={{ height: 20 }} />
            </ScrollView>
          </View>
        </SafeAreaView>

        {renderAdminTabBar()}
      </View>
    );
  };

  // ==========================================
  // SCREEN 2-C: EDUSPHERE ADMIN FINANCE & FEES MANAGEMENT HUB
  // ==========================================
  const renderAdminFinanceScreen = () => {
    const classFilterOptions = ['All', 'Grade 6-A', 'Class 4-B', 'Class 7-A', 'KG-II'];
    const statusFilterOptions = ['All', 'Paid', 'Pending', 'Overdue'];

    // Filter students by Search, Class, and Status
    const filteredLedger = studentFeeLedger.filter((item) => {
      const matchSearch =
        item.studentName.toLowerCase().includes(feeSearchQuery.toLowerCase()) ||
        item.admissionNo.toLowerCase().includes(feeSearchQuery.toLowerCase()) ||
        String(item.roll).includes(feeSearchQuery) ||
        item.receiptNo.toLowerCase().includes(feeSearchQuery.toLowerCase());
      const matchClass = feeClassFilter === 'All' || item.grade === feeClassFilter;
      const matchStatus = feeStatusFilter === 'All' || item.status.toLowerCase() === feeStatusFilter.toLowerCase();
      return matchSearch && matchClass && matchStatus;
    });

    // Dynamic totals calculated from the ledger
    const totalCollectedNum = studentFeeLedger.reduce((acc, curr) => acc + curr.paidAmount, 0);
    const totalPendingNum = studentFeeLedger.reduce((acc, curr) => acc + curr.pendingBalance, 0);
    const totalTargetNum = totalCollectedNum + totalPendingNum;
    const collectionPercentage = Math.round((totalCollectedNum / (totalTargetNum || 1)) * 100);

    const feeCategories = [
      { id: 'tuition', title: 'Tuition Fees', collected: '₹24.50 L', target: '₹26.00 L', pct: '94.2%', color: '#10B981' },
      { id: 'transport', title: 'Transport / Bus Route', collected: '₹5.80 L', target: '₹6.50 L', pct: '89.2%', color: '#3B82F6' },
      { id: 'lab', title: 'Laboratory & Library', collected: '₹3.20 L', target: '₹4.50 L', pct: '71.1%', color: '#F59E0B' },
      { id: 'sports', title: 'Sports & Activities', collected: '₹1.30 L', target: '₹2.00 L', pct: '65.0%', color: '#8B5CF6' },
    ];

    const handleOpenReceipt = (studentItem, historyItem) => {
      setSelectedReceiptTxn({
        receiptNo: studentItem.receiptNo,
        txnId: historyItem?.txnId || 'TXN-901',
        studentName: studentItem.studentName,
        admissionNo: studentItem.admissionNo,
        grade: studentItem.grade,
        term: historyItem?.term || 'Academic Term 2',
        amount: historyItem?.amount || studentItem.paidAmount,
        date: historyItem?.date || studentItem.lastPaymentDate,
        mode: historyItem?.mode || 'UPI NetBanking',
        status: historyItem?.status || 'Success',
        pendingBalance: studentItem.pendingBalance,
        totalFee: studentItem.totalFee,
      });
      setReceiptDetailModalVisible(true);
    };

    return (
      <View style={styles.phoneFrame}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0F172A' }}>
          {/* Subpage Header */}
          <View style={styles.adminFacultyHeader}>
            <TouchableOpacity
              style={styles.adminFacultyBackBtn}
              onPress={() => {
                setCurrentScreen('edusphere_admin');
                setAdminActiveTab('Dashboard');
              }}
            >
              <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.adminFacultyTitle}>Fee & Finance Management</Text>
              <Text style={styles.adminFacultySub}>FY 2026-27 • Realized: {collectionPercentage}%</Text>
            </View>
            <TouchableOpacity
              style={styles.adminFacultyAddBtn}
              onPress={() => showAlert('Audit Ledger Exported', 'Full school fiscal statement exported as PDF & CSV with transaction logs.')}
            >
              <Ionicons name="download-outline" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.adminFacultyBody}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
              {/* Financial Highlight Card with Indian Rupee formatting */}
              <LinearGradient
                colors={['#1E293B', '#334155']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.adminFinanceTopCard}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ fontSize: 12, color: '#94A3B8', fontWeight: '700', letterSpacing: 0.5 }}>TOTAL COLLECTED</Text>
                  <View style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 }}>
                    <Text style={{ fontSize: 11, fontWeight: '800', color: '#34D399' }}>+12.4% vs FY 25</Text>
                  </View>
                </View>
                <Text style={styles.adminFinanceBigAmount}>₹{totalCollectedNum.toLocaleString('en-IN')}</Text>
                
                {/* Secondary metric row: Pending Fees and Target */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                  <Text style={{ fontSize: 12, color: '#F87171', fontWeight: '700' }}>
                    Pending Fees: ₹{totalPendingNum.toLocaleString('en-IN')}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#94A3B8' }}>
                    Target: ₹{totalTargetNum.toLocaleString('en-IN')}
                  </Text>
                </View>

                {/* Progress bar */}
                <View style={[styles.adminFeeProgressTrack, { marginTop: 12, backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                  <View style={[styles.adminFeeProgressFill, { width: `${collectionPercentage}%`, backgroundColor: '#38BDF8' }]} />
                </View>
              </LinearGradient>

              {/* 3 Overview Quick Metric Cards */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 }}>
                <View style={{ flex: 1, backgroundColor: '#1E293B', padding: 12, borderRadius: 14, marginRight: 6, borderWidth: 1, borderColor: '#334155' }}>
                  <Text style={{ fontSize: 10, fontWeight: '700', color: '#34D399', textTransform: 'uppercase' }}>COLLECTED</Text>
                  <Text style={{ fontSize: 16, fontWeight: '900', color: '#F8FAFC', marginTop: 2 }}>₹{(totalCollectedNum / 100000).toFixed(2)}L</Text>
                  <Text style={{ fontSize: 10, color: '#94A3B8', marginTop: 1 }}>{collectionPercentage}% achieved</Text>
                </View>

                <View style={{ flex: 1, backgroundColor: '#1E293B', padding: 12, borderRadius: 14, marginHorizontal: 3, borderWidth: 1, borderColor: '#334155' }}>
                  <Text style={{ fontSize: 10, fontWeight: '700', color: '#F87171', textTransform: 'uppercase' }}>PENDING</Text>
                  <Text style={{ fontSize: 16, fontWeight: '900', color: '#F87171', marginTop: 2 }}>₹{(totalPendingNum / 1000).toFixed(1)}k</Text>
                  <Text style={{ fontSize: 10, color: '#94A3B8', marginTop: 1 }}>28 Students Due</Text>
                </View>

                <View style={{ flex: 1, backgroundColor: '#1E293B', padding: 12, borderRadius: 14, marginLeft: 6, borderWidth: 1, borderColor: '#334155' }}>
                  <Text style={{ fontSize: 10, fontWeight: '700', color: '#38BDF8', textTransform: 'uppercase' }}>REMITTANCES</Text>
                  <Text style={{ fontSize: 16, fontWeight: '900', color: '#38BDF8', marginTop: 2 }}>142</Text>
                  <Text style={{ fontSize: 10, color: '#94A3B8', marginTop: 1 }}>This Month</Text>
                </View>
              </View>

              {/* Search Bar for Student / Roll / Receipt */}
              <View style={[styles.adminFacultySearchBox, { marginTop: 16, marginBottom: 8 }]}>
                <Ionicons name="search" size={18} color="#94A3B8" style={{ marginRight: 8 }} />
                <TextInput
                  style={styles.adminFacultySearchInput}
                  placeholder="Search by student name, adm no, or receipt #..."
                  placeholderTextColor="#94A3B8"
                  value={feeSearchQuery}
                  onChangeText={setFeeSearchQuery}
                />
                {feeSearchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setFeeSearchQuery('')}>
                    <Ionicons name="close-circle" size={16} color="#94A3B8" />
                  </TouchableOpacity>
                )}
              </View>

              {/* Class Filters Horizontal Scroll */}
              <View style={{ marginBottom: 10 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {classFilterOptions.map((cls) => (
                    <TouchableOpacity
                      key={cls}
                      style={[
                        styles.settingsEditBadge,
                        feeClassFilter === cls && { backgroundColor: '#2563EB', borderColor: '#2563EB' },
                        { marginRight: 6, paddingHorizontal: 12, paddingVertical: 5 }
                      ]}
                      onPress={() => setFeeClassFilter(cls)}
                    >
                      <Text style={[styles.settingsEditBadgeText, feeClassFilter === cls && { color: '#FFFFFF' }]}>
                        {cls}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Payment Status Badges Filter */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, gap: 6 }}>
                <Text style={{ fontSize: 11, fontWeight: '700', color: '#94A3B8', marginRight: 4 }}>STATUS:</Text>
                {statusFilterOptions.map((st) => {
                  const isSel = feeStatusFilter === st;
                  const activeBg = st === 'Paid' ? '#10B981' : st === 'Pending' ? '#F59E0B' : st === 'Overdue' ? '#EF4444' : '#2563EB';
                  return (
                    <TouchableOpacity
                      key={st}
                      style={[
                        {
                          paddingHorizontal: 10,
                          paddingVertical: 4,
                          borderRadius: 12,
                          backgroundColor: isSel ? activeBg : '#1E293B',
                          borderWidth: 1,
                          borderColor: isSel ? activeBg : '#334155',
                        }
                      ]}
                      onPress={() => setFeeStatusFilter(st)}
                    >
                      <Text style={{ fontSize: 11, fontWeight: '700', color: isSel ? '#FFFFFF' : '#94A3B8' }}>
                        {st}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Student Balances & Fee Records List */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Text style={styles.adminSectionTitle}>
                  STUDENT FEE BALANCES ({filteredLedger.length})
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    showAlert('Bulk Reminders Sent', 'SMS & Push Notifications sent to all 28 students with pending dues.');
                  }}
                >
                  <Text style={{ fontSize: 11, color: '#38BDF8', fontWeight: '800' }}>Remind All Dues 🔔</Text>
                </TouchableOpacity>
              </View>

              {filteredLedger.map((item) => {
                const statusColor = item.status === 'Paid' ? '#10B981' : item.status === 'Pending' ? '#F59E0B' : '#EF4444';
                const statusBg = item.status === 'Paid' ? 'rgba(16, 185, 129, 0.15)' : item.status === 'Pending' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)';

                return (
                  <View
                    key={item.id}
                    style={[
                      styles.adminStudentCard,
                      { padding: 14, marginBottom: 10, backgroundColor: '#1E293B', borderColor: '#334155' }
                    ]}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image source={{ uri: item.avatar }} style={{ width: 44, height: 44, borderRadius: 22, marginRight: 10 }} />
                      <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Text style={{ fontSize: 14, fontWeight: '800', color: '#F8FAFC' }}>{item.studentName}</Text>
                          <View style={{ backgroundColor: statusBg, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 }}>
                            <Text style={{ fontSize: 10, fontWeight: '800', color: statusColor }}>
                              ● {item.status.toUpperCase()}
                            </Text>
                          </View>
                        </View>

                        <Text style={{ fontSize: 11, color: '#94A3B8', marginTop: 1 }}>
                          {item.admissionNo} • Roll #{item.roll} • {item.grade}
                        </Text>
                      </View>
                    </View>

                    {/* Financial Figures Row */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#0F172A', borderRadius: 10, padding: 10, marginTop: 10 }}>
                      <View>
                        <Text style={{ fontSize: 10, color: '#94A3B8', fontWeight: '600' }}>TOTAL FEE</Text>
                        <Text style={{ fontSize: 13, fontWeight: '800', color: '#F8FAFC', marginTop: 1 }}>
                          ₹{item.totalFee.toLocaleString('en-IN')}
                        </Text>
                      </View>

                      <View>
                        <Text style={{ fontSize: 10, color: '#94A3B8', fontWeight: '600' }}>PAID AMOUNT</Text>
                        <Text style={{ fontSize: 13, fontWeight: '800', color: '#10B981', marginTop: 1 }}>
                          ₹{item.paidAmount.toLocaleString('en-IN')}
                        </Text>
                      </View>

                      <View>
                        <Text style={{ fontSize: 10, color: '#94A3B8', fontWeight: '600' }}>PENDING DUE</Text>
                        <Text style={{ fontSize: 13, fontWeight: '800', color: item.pendingBalance > 0 ? '#F87171' : '#10B981', marginTop: 1 }}>
                          ₹{item.pendingBalance.toLocaleString('en-IN')}
                        </Text>
                      </View>
                    </View>

                    {/* Footer Actions: Payment History & View Receipt */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                      <Text style={{ fontSize: 11, color: '#94A3B8' }}>
                        Receipt: <Text style={{ color: '#38BDF8', fontWeight: '700' }}>{item.receiptNo}</Text>
                      </Text>

                      <View style={{ flexDirection: 'row', gap: 6 }}>
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#334155',
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            borderRadius: 8,
                          }}
                          onPress={() => handleOpenReceipt(item, item.paymentHistory[item.paymentHistory.length - 1])}
                        >
                          <Ionicons name="receipt-outline" size={14} color="#F8FAFC" style={{ marginRight: 4 }} />
                          <Text style={{ fontSize: 11, fontWeight: '700', color: '#F8FAFC' }}>Receipt</Text>
                        </TouchableOpacity>

                        {item.pendingBalance > 0 && (
                          <TouchableOpacity
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              backgroundColor: '#DC2626',
                              paddingHorizontal: 10,
                              paddingVertical: 5,
                              borderRadius: 8,
                            }}
                            onPress={() => {
                              showAlert(
                                'Fee Reminder Dispatched',
                                `Urgent reminder sent to ${item.studentName}'s parents for pending balance ₹${item.pendingBalance.toLocaleString('en-IN')}. Due date: ${item.dueDate}.`
                              );
                            }}
                          >
                            <Ionicons name="mail" size={14} color="#FFFFFF" style={{ marginRight: 4 }} />
                            <Text style={{ fontSize: 11, fontWeight: '700', color: '#FFFFFF' }}>Remind</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </View>
                );
              })}

              {/* Department Fee Breakdown */}
              <Text style={[styles.adminSectionTitle, { marginTop: 18 }]}>REVENUE CATEGORY BREAKDOWN</Text>
              <View style={styles.adminSectionCard}>
                {feeCategories.map((cat, idx) => (
                  <View
                    key={cat.id}
                    style={[
                      styles.adminFinanceCatRow,
                      idx === feeCategories.length - 1 && { borderBottomWidth: 0 },
                    ]}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={styles.adminFinanceCatTitle}>{cat.title}</Text>
                      <Text style={styles.adminFinanceCatSub}>
                        {cat.collected} of {cat.target}
                      </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={[styles.adminFinanceCatPct, { color: cat.color }]}>{cat.pct}</Text>
                      <View style={[styles.adminFinanceMiniTrack, { width: 60 }]}>
                        <View style={[styles.adminFinanceMiniFill, { width: cat.pct, backgroundColor: cat.color }]} />
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              <View style={{ height: 28 }} />
            </ScrollView>
          </View>
        </SafeAreaView>

        {renderAdminTabBar()}
      </View>
    );
  };


  // Clean EduSphere Admin Bottom Navigation Bar
  const renderAdminTabBar = () => (
    <View style={styles.adminBottomNavBar}>
      {[
        { id: 'Dashboard', icon: 'grid', label: 'Dashboard' },
        { id: 'Students', icon: 'school', label: 'Students' },
        { id: 'Faculty', icon: 'people', label: 'Faculty' },
        { id: 'Finance', icon: 'wallet', label: 'Finance' },
        { id: 'Alerts', icon: 'notifications', label: 'Alerts' },
        { id: 'Settings', icon: 'settings', label: 'Settings' },
      ].map((tab) => {
        const isActive = adminActiveTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.adminBottomNavTab}
            activeOpacity={0.8}
            onPress={() => {
              setAdminActiveTab(tab.id);
              if (tab.id === 'Dashboard') {
                setCurrentScreen('edusphere_admin');
              } else if (tab.id === 'Students') {
                setCurrentScreen('admin_students');
              } else if (tab.id === 'Faculty') {
                setCurrentScreen('admin_faculty');
              } else if (tab.id === 'Finance') {
                setCurrentScreen('admin_finance');
              } else if (tab.id === 'Alerts') {
                setCurrentScreen('notifications');
                setActiveTab('Notifications');
              } else if (tab.id === 'Settings') {
                setCurrentScreen('settings');
                setActiveTab('More');
              }
            }}
          >
            <Ionicons
              name={isActive ? tab.icon : `${tab.icon}-outline`}
              size={22}
              color={isActive ? '#38BDF8' : '#94A3B8'}
            />
            <Text
              style={[
                styles.adminBottomNavLabel,
                isActive && styles.adminBottomNavLabelActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  // Helper to open Add Student Form
  const handleOpenAddStudent = () => {
    setEditingStudentId(null);
    setFormName('');
    setFormAdmNo(`ADM-2026-${Math.floor(100 + Math.random() * 900)}`);
    setFormRoll(`${Math.floor(10 + Math.random() * 89)}`);
    setFormGrade('Grade 6-A');
    setFormDob('15 Jan 2014');
    setFormBloodGroup('B+');
    setFormGender('Male');
    setFormStatus('Active');
    setFormFatherName('');
    setFormMotherName('');
    setFormGuardianPhone('');
    setFormGuardianEmail('');
    setFormAddress('');
    setStudentAddEditModalVisible(true);
  };

  // Helper to open Edit Student Form
  const handleOpenEditStudent = (student) => {
    setEditingStudentId(student.id);
    setFormName(student.name);
    setFormAdmNo(student.admissionNo);
    setFormRoll(String(student.roll));
    setFormGrade(student.grade);
    setFormDob(student.dob || '14 May 2013');
    setFormBloodGroup(student.bloodGroup || 'B+');
    setFormGender(student.gender || 'Male');
    setFormStatus(student.status || 'Active');
    setFormFatherName(student.guardian?.fatherName || '');
    setFormMotherName(student.guardian?.motherName || '');
    setFormGuardianPhone(student.guardian?.phone || '');
    setFormGuardianEmail(student.guardian?.email || '');
    setFormAddress(student.guardian?.address || '');
    setStudentAddEditModalVisible(true);
  };

  // Helper to save student record
  const handleSaveStudentRecord = () => {
    if (!formName.trim()) {
      showAlert('Required', 'Please enter student full name.');
      return;
    }
    if (!formAdmNo.trim()) {
      showAlert('Required', 'Please enter admission number.');
      return;
    }

    const statusColors = {
      Active: '#10B981',
      'Pending Verification': '#F59E0B',
      'On Leave': '#6366F1',
      Inactive: '#EF4444',
    };

    if (editingStudentId) {
      // Update existing
      setMasterStudentsList((prev) =>
        prev.map((item) => {
          if (item.id === editingStudentId) {
            return {
              ...item,
              name: formName.trim(),
              admissionNo: formAdmNo.trim(),
              roll: parseInt(formRoll, 10) || item.roll,
              grade: formGrade,
              dob: formDob,
              bloodGroup: formBloodGroup,
              gender: formGender,
              status: formStatus,
              statusColor: statusColors[formStatus] || '#10B981',
              guardian: {
                ...item.guardian,
                fatherName: formFatherName,
                motherName: formMotherName,
                phone: formGuardianPhone,
                email: formGuardianEmail,
                address: formAddress,
              },
            };
          }
          return item;
        })
      );
      showAlert('Student Updated', `${formName} record has been saved successfully.`);
    } else {
      // Create new
      const newId = Math.max(0, ...masterStudentsList.map((s) => s.id)) + 1;
      const newStudent = {
        id: newId,
        admissionNo: formAdmNo.trim(),
        roll: parseInt(formRoll, 10) || 120,
        name: formName.trim(),
        gender: formGender,
        dob: formDob,
        bloodGroup: formBloodGroup,
        grade: formGrade,
        section: formGrade.split('-')[1] || 'A',
        status: formStatus,
        statusColor: statusColors[formStatus] || '#10B981',
        attendancePercent: '95.0%',
        present: true,
        marks: '85/100',
        gpa: '85.0%',
        rank: `${newId}th`,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
        guardian: {
          fatherName: formFatherName,
          motherName: formMotherName,
          relation: 'Guardian',
          phone: formGuardianPhone || '+91 98000 00000',
          email: formGuardianEmail || 'guardian@gmail.com',
          address: formAddress || 'Campus Quarters',
        },
        academicHistory: [
          { year: '2025-26', grade: formGrade, term: 'Current Term', percentage: '85.0%', result: 'Enrolled' },
        ],
      };
      setMasterStudentsList((prev) => [newStudent, ...prev]);
      showAlert('Student Added', `${formName} has been enrolled into ${formGrade}.`);
    }

    setStudentAddEditModalVisible(false);
  };

  // Helper to delete student record
  const handleDeleteStudentRecord = (studentId) => {
    setMasterStudentsList((prev) => prev.filter((s) => s.id !== studentId));
    setStudentDetailModalVisible(false);
    showAlert('Student Removed', 'Student record deleted from school database.');
  };

  // ==========================================
  // SCREEN 2-E: ADMIN STUDENT MANAGEMENT HUB
  // ==========================================
  const renderAdminStudentsScreen = () => {
    const classOptions = ['All', 'Grade 6-A', 'Class 4-B', 'Class 7-A', 'KG-II'];

    const filtered = masterStudentsList.filter((st) => {
      const matchSearch =
        st.name.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
        st.admissionNo.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
        String(st.roll).includes(studentSearchQuery);
      const matchClass = studentClassFilter === 'All' || st.grade === studentClassFilter;
      return matchSearch && matchClass;
    });

    return (
      <View style={styles.phoneFrame}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0F172A' }}>
          {/* Header */}
          <View style={styles.adminFacultyHeader}>
            <TouchableOpacity
              style={styles.adminFacultyBackBtn}
              onPress={() => {
                setCurrentScreen('edusphere_admin');
                setAdminActiveTab('Dashboard');
              }}
            >
              <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.adminFacultyTitle}>Student Records & Management</Text>
              <Text style={styles.adminFacultySub}>
                {masterStudentsList.length} Active Records • Full Admin Authority
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.adminFacultyAddBtn, { backgroundColor: '#10B981' }]}
              onPress={handleOpenAddStudent}
            >
              <Ionicons name="person-add" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.adminFacultyBody}>
            {/* Search Bar */}
            <View style={styles.adminFacultySearchBox}>
              <Ionicons name="search" size={18} color="#94A3B8" style={{ marginRight: 8 }} />
              <TextInput
                style={styles.adminFacultySearchInput}
                placeholder="Search by name, admission no, or roll..."
                placeholderTextColor="#94A3B8"
                value={studentSearchQuery}
                onChangeText={setStudentSearchQuery}
              />
              {studentSearchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setStudentSearchQuery('')}>
                  <Ionicons name="close-circle" size={16} color="#94A3B8" />
                </TouchableOpacity>
              )}
            </View>

            {/* Class Filter Horizontal Bar */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 10, maxHeight: 40 }}
            >
              {classOptions.map((cls) => {
                const isActive = studentClassFilter === cls;
                return (
                  <TouchableOpacity
                    key={cls}
                    style={[
                      styles.adminFacultyFilterPill,
                      isActive && { backgroundColor: '#2563EB', borderColor: '#3B82F6' },
                    ]}
                    onPress={() => setStudentClassFilter(cls)}
                  >
                    <Text
                      style={[
                        styles.adminFacultyFilterPillText,
                        isActive && { color: '#FFFFFF', fontWeight: '800' },
                      ]}
                    >
                      {cls}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Students List ScrollView */}
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginTop: 12 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Text style={{ fontSize: 12, fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>
                  SHOWING {filtered.length} OF {masterStudentsList.length} STUDENTS
                </Text>
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={handleOpenAddStudent}
                >
                  <Ionicons name="add-circle" size={16} color="#2563EB" style={{ marginRight: 4 }} />
                  <Text style={{ fontSize: 12, fontWeight: '700', color: '#2563EB' }}>Add Student</Text>
                </TouchableOpacity>
              </View>

              {filtered.map((student) => (
                <TouchableOpacity
                  key={student.id}
                  style={styles.adminStudentCard}
                  activeOpacity={0.85}
                  onPress={() => {
                    setSelectedStudentForDetail(student);
                    setStudentDetailModalVisible(true);
                  }}
                >
                  <Image source={{ uri: student.avatar }} style={styles.adminStudentAvatar} />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text style={styles.adminStudentName}>{student.name}</Text>
                      <View style={[styles.adminStudentStatusBadge, { backgroundColor: student.statusColor + '20' }]}>
                        <Text style={[styles.adminStudentStatusText, { color: student.statusColor }]}>
                          ● {student.status}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.adminStudentAdmNo}>
                      Adm: <Text style={{ fontWeight: '700', color: '#2563EB' }}>{student.admissionNo}</Text> • Roll #{student.roll}
                    </Text>

                    <View style={styles.adminStudentMetaRow}>
                      <Text style={styles.adminStudentGradeBadge}>{student.grade}</Text>
                      <Text style={styles.adminStudentAttText}>Att: {student.attendancePercent}</Text>
                      <Text style={styles.adminStudentGpaText}>GPA: {student.gpa}</Text>
                    </View>
                  </View>

                  {/* Quick Edit Action Button */}
                  <TouchableOpacity
                    style={styles.adminStudentEditBtn}
                    onPress={(e) => {
                      e.stopPropagation?.();
                      handleOpenEditStudent(student);
                    }}
                  >
                    <Ionicons name="create-outline" size={18} color="#475569" />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}

              <View style={{ height: 24 }} />
            </ScrollView>
          </View>
        </SafeAreaView>

        {renderAdminTabBar()}
      </View>
    );
  };

  // ==========================================
  // SCREEN 10-D: TEACHER ASSIGNED STUDENTS SCREEN
  // ==========================================
  const renderTeacherStudentsScreen = () => {
    // Teachers see students assigned to their class (Grade 6-A by default, or class filter)
    const teacherClasses = ['Grade 6-A', 'All Assigned'];
    const activeTeacherFilter = studentClassFilter === 'All' ? 'Grade 6-A' : studentClassFilter;

    const assignedStudents = masterStudentsList.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
        s.admissionNo.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
        String(s.roll).includes(studentSearchQuery);
      const matchClass = activeTeacherFilter === 'All Assigned' ? true : s.grade === activeTeacherFilter;
      return matchSearch && matchClass;
    });

    return (
      <View style={[styles.phoneFrame, { backgroundColor: '#F8FAFC' }]}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* Header */}
          <View style={styles.teacherSubpageHeader}>
            <TouchableOpacity
              style={styles.teacherSubpageBackBtn}
              onPress={() => {
                setCurrentScreen('teacher');
                setTeacherActiveTab('Home');
              }}
            >
              <Ionicons name="arrow-back" size={22} color="#0F172A" />
            </TouchableOpacity>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.teacherSubpageTitle}>Assigned Class Students</Text>
              <Text style={{ fontSize: 11, color: '#64748B' }}>
                Grade 6-A • {assignedStudents.length} Students Enrolled
              </Text>
            </View>
            <TouchableOpacity
              style={styles.teacherSubpageActionBtn}
              onPress={() => showAlert('Class Actions', '• Export Class Attendance CSV\n• Download Roster PDF\n• Message All Parents')}
            >
              <Ionicons name="ellipsis-vertical" size={20} color="#0F172A" />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, paddingHorizontal: 18, paddingTop: 10 }}>
            {/* Search Bar */}
            <View style={styles.teacherSearchWrap}>
              <Ionicons name="search-outline" size={20} color="#94A3B8" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.teacherSearchInput}
                placeholder="Search student or roll number..."
                placeholderTextColor="#94A3B8"
                value={studentSearchQuery}
                onChangeText={setStudentSearchQuery}
              />
              {studentSearchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setStudentSearchQuery('')}>
                  <Ionicons name="close-circle" size={18} color="#94A3B8" />
                </TouchableOpacity>
              )}
            </View>

            {/* Quick Class Stats Banner */}
            <View style={{ backgroundColor: '#2E798A', borderRadius: 16, padding: 14, marginTop: 10, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={{ fontSize: 11, fontWeight: '700', color: '#CCFBF1', textTransform: 'uppercase' }}>CLASS ROSTER OVERVIEW</Text>
                <Text style={{ fontSize: 18, fontWeight: '900', color: '#FFFFFF', marginTop: 2 }}>Class 6-A (Room 204)</Text>
                <Text style={{ fontSize: 11, color: '#E0F2FE', marginTop: 2 }}>Faculty In-Charge: Sarah Jenkins</Text>
              </View>
              <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: '900', color: '#FFFFFF' }}>{assignedStudents.length}</Text>
                <Text style={{ fontSize: 9, fontWeight: '800', color: '#CCFBF1' }}>STUDENTS</Text>
              </View>
            </View>

            {/* Students List */}
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
              {assignedStudents.map((student) => (
                <TouchableOpacity
                  key={student.id}
                  style={styles.teacherStudentCard}
                  activeOpacity={0.85}
                  onPress={() => {
                    setSelectedStudentForDetail(student);
                    setStudentDetailModalVisible(true);
                  }}
                >
                  <Image source={{ uri: student.avatar }} style={styles.teacherStudentAvatar} />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={styles.teacherStudentName}>#{student.roll} {student.name}</Text>
                      <View style={[styles.teacherStudentStatusPill, { backgroundColor: student.present ? '#ECFDF5' : '#FEF2F2' }]}>
                        <Text style={{ fontSize: 10, fontWeight: '800', color: student.present ? '#059669' : '#DC2626' }}>
                          {student.present ? 'Present' : 'Absent'}
                        </Text>
                      </View>
                    </View>

                    <Text style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
                      {student.admissionNo} • Blood: {student.bloodGroup}
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                      <Text style={{ fontSize: 11, fontWeight: '700', color: '#2563EB', marginRight: 10 }}>
                        Score: {student.marks}
                      </Text>
                      <Text style={{ fontSize: 11, color: '#475569' }}>
                        Guardian: {student.guardian?.motherName || student.guardian?.fatherName}
                      </Text>
                    </View>
                  </View>

                  <Ionicons name="chevron-forward" size={18} color="#94A3B8" style={{ marginLeft: 8 }} />
                </TouchableOpacity>
              ))}

              <View style={{ height: 24 }} />
            </ScrollView>
          </View>

          {/* Teacher Bottom Tabs */}
          <View style={styles.teacherBottomNavBar}>
            {[
              { id: 'Home', icon: 'home-outline', label: 'Home' },
              { id: 'Students', icon: 'people', label: 'Students' },
              { id: 'Schedule', icon: 'calendar-outline', label: 'Schedule' },
              { id: 'Exams', icon: 'clipboard-outline', label: 'Exams' },
              { id: 'AskAI', icon: 'chatbubble-ellipses-outline', label: 'Ask AI' },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={styles.teacherBottomTab}
                onPress={() => {
                  setTeacherActiveTab(tab.id);
                  if (tab.id === 'Home') setCurrentScreen('teacher');
                  if (tab.id === 'Students') setCurrentScreen('teacher_students');
                  if (tab.id === 'Schedule') setCurrentScreen('teacher_schedule');
                  if (tab.id === 'Exams') setCurrentScreen('teacher_exams');
                  if (tab.id === 'AskAI') setCurrentScreen('teacher_ai');
                }}
              >
                <Ionicons
                  name={tab.id === 'Students' ? 'people' : tab.icon}
                  size={22}
                  color={tab.id === 'Students' ? '#2E798A' : '#94A3B8'}
                />
                <Text
                  style={[
                    styles.teacherBottomTabLabel,
                    tab.id === 'Students' && styles.teacherBottomTabLabelActive,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
      </View>
    );
  };

  // ==========================================
  // SCREEN 2-F: ADMIN & TEACHER ATTENDANCE HUB SCREEN
  // ==========================================
  const renderAttendanceHubScreen = () => {
    const classList = ['Grade 6-A', 'Class 4-B', 'Class 7-A', 'KG-II'];
    const dateOptions = ['14 Oct 2026', '13 Oct 2026', '12 Oct 2026'];

    // Filter students by current class selector
    const currentStudents = masterStudentsList.filter((s) => s.grade === attendanceClass);

    // Summary calculation
    const presentCount = currentStudents.filter((s) => dailyAttendanceRecords[s.id] === 'Present').length;
    const absentCount = currentStudents.filter((s) => dailyAttendanceRecords[s.id] === 'Absent').length;
    const leaveCount = currentStudents.filter((s) => dailyAttendanceRecords[s.id] === 'Leave').length;
    const totalCount = currentStudents.length || 1;
    const attendancePercentage = Math.round((presentCount / totalCount) * 100);

    // Mark All Present Action
    const handleMarkAllPresent = () => {
      setDailyAttendanceRecords((prev) => {
        const next = { ...prev };
        currentStudents.forEach((st) => {
          next[st.id] = 'Present';
        });
        return next;
      });
      showAlert('All Marked Present', `Marked all ${currentStudents.length} students in ${attendanceClass} as Present.`);
    };

    // Save Attendance Action
    const handleSaveAttendance = () => {
      setIsAttendanceSaved(true);
      // Sync masterStudentsList
      setMasterStudentsList((prev) =>
        prev.map((st) => {
          if (st.grade === attendanceClass && dailyAttendanceRecords[st.id]) {
            return {
              ...st,
              present: dailyAttendanceRecords[st.id] === 'Present',
              status: dailyAttendanceRecords[st.id] === 'Present' ? 'Active' : dailyAttendanceRecords[st.id] === 'Leave' ? 'On Leave' : 'Pending Verification',
            };
          }
          return st;
        })
      );
      showAlert(
        'Attendance Saved Successfully! 🎉',
        `Date: ${attendanceDate}\nClass: ${attendanceClass}\nPresent: ${presentCount} • Absent: ${absentCount} • Leave: ${leaveCount}\nAll parents and central administration notified.`
      );
    };

    return (
      <View style={styles.phoneFrame}>
        <SafeAreaView style={{ flex: 1, backgroundColor: userRole === 'admin' ? '#0F172A' : '#F8FAFC' }}>
          {/* Header */}
          <View style={userRole === 'admin' ? styles.adminFacultyHeader : styles.teacherSubpageHeader}>
            <TouchableOpacity
              style={userRole === 'admin' ? styles.adminFacultyBackBtn : styles.teacherSubpageBackBtn}
              onPress={() => {
                if (userRole === 'admin') {
                  setCurrentScreen('edusphere_admin');
                } else if (userRole === 'teacher') {
                  setCurrentScreen('teacher');
                } else {
                  setCurrentScreen('dashboard');
                }
              }}
            >
              <Ionicons name="arrow-back" size={22} color={userRole === 'admin' ? '#FFFFFF' : '#0F172A'} />
            </TouchableOpacity>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={userRole === 'admin' ? styles.adminFacultyTitle : styles.teacherSubpageTitle}>
                {userRole === 'admin' ? 'Campus Attendance Monitor' : 'Class Attendance Register'}
              </Text>
              <Text style={{ fontSize: 11, color: userRole === 'admin' ? '#94A3B8' : '#64748B' }}>
                {attendanceClass} • {attendanceDate}
              </Text>
            </View>
            <TouchableOpacity
              style={[userRole === 'admin' ? styles.adminFacultyAddBtn : styles.teacherSubpageActionBtn, { backgroundColor: '#10B981' }]}
              onPress={handleSaveAttendance}
            >
              <Ionicons name="checkmark-done" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <ScrollView style={{ flex: 1, paddingHorizontal: 18 }} showsVerticalScrollIndicator={false}>
            {/* 1. Date & Class Selectors */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
              {/* Class Selector Bar */}
              <View style={{ flex: 1.2, marginRight: 8 }}>
                <Text style={{ fontSize: 11, fontWeight: '700', color: userRole === 'admin' ? '#94A3B8' : '#475569', marginBottom: 6 }}>
                  SELECT CLASS
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {classList.map((cls) => (
                    <TouchableOpacity
                      key={cls}
                      style={[
                        styles.settingsEditBadge,
                        attendanceClass === cls && { backgroundColor: '#2563EB', borderColor: '#2563EB' },
                        { marginRight: 6 }
                      ]}
                      onPress={() => setAttendanceClass(cls)}
                    >
                      <Text style={[styles.settingsEditBadgeText, attendanceClass === cls && { color: '#FFFFFF' }]}>
                        {cls}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Date Selector */}
              <View style={{ flex: 1, marginLeft: 4 }}>
                <Text style={{ fontSize: 11, fontWeight: '700', color: userRole === 'admin' ? '#94A3B8' : '#475569', marginBottom: 6 }}>
                  DATE
                </Text>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: userRole === 'admin' ? '#1E293B' : '#FFFFFF',
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: userRole === 'admin' ? '#334155' : '#E2E8F0',
                  }}
                  onPress={() => {
                    const nextDate = attendanceDate === '14 Oct 2026' ? '13 Oct 2026' : '14 Oct 2026';
                    setAttendanceDate(nextDate);
                  }}
                >
                  <Ionicons name="calendar-outline" size={14} color="#2563EB" style={{ marginRight: 6 }} />
                  <Text style={{ fontSize: 12, fontWeight: '700', color: userRole === 'admin' ? '#F8FAFC' : '#0F172A' }}>
                    {attendanceDate}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 2. Attendance Summary Cards */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 }}>
              {/* Present */}
              <View style={{ flex: 1, backgroundColor: '#ECFDF5', padding: 12, borderRadius: 14, marginRight: 6, borderWidth: 1, borderColor: '#A7F3D0', alignItems: 'center' }}>
                <Text style={{ fontSize: 10, fontWeight: '800', color: '#065F46', textTransform: 'uppercase' }}>PRESENT</Text>
                <Text style={{ fontSize: 20, fontWeight: '900', color: '#059669', marginTop: 2 }}>{presentCount}</Text>
                <Text style={{ fontSize: 10, color: '#059669', fontWeight: '700' }}>{attendancePercentage}%</Text>
              </View>

              {/* Absent */}
              <View style={{ flex: 1, backgroundColor: '#FEF2F2', padding: 12, borderRadius: 14, marginHorizontal: 3, borderWidth: 1, borderColor: '#FECACA', alignItems: 'center' }}>
                <Text style={{ fontSize: 10, fontWeight: '800', color: '#991B1B', textTransform: 'uppercase' }}>ABSENT</Text>
                <Text style={{ fontSize: 20, fontWeight: '900', color: '#DC2626', marginTop: 2 }}>{absentCount}</Text>
                <Text style={{ fontSize: 10, color: '#DC2626', fontWeight: '700' }}>Students</Text>
              </View>

              {/* Leave */}
              <View style={{ flex: 1, backgroundColor: '#EFF6FF', padding: 12, borderRadius: 14, marginLeft: 6, borderWidth: 1, borderColor: '#BFDBFE', alignItems: 'center' }}>
                <Text style={{ fontSize: 10, fontWeight: '800', color: '#1E40AF', textTransform: 'uppercase' }}>LEAVE</Text>
                <Text style={{ fontSize: 20, fontWeight: '900', color: '#2563EB', marginTop: 2 }}>{leaveCount}</Text>
                <Text style={{ fontSize: 10, color: '#2563EB', fontWeight: '700' }}>Approved</Text>
              </View>
            </View>

            {/* Quick Action Bar: Mark All Present & Save */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, marginBottom: 8 }}>
              <Text style={{ fontSize: 12, fontWeight: '800', color: userRole === 'admin' ? '#94A3B8' : '#475569', textTransform: 'uppercase' }}>
                STUDENT ATTENDANCE LIST ({currentStudents.length})
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#10B981',
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 14,
                }}
                onPress={handleMarkAllPresent}
              >
                <Ionicons name="checkmark-done-circle" size={16} color="#FFFFFF" style={{ marginRight: 4 }} />
                <Text style={{ fontSize: 11, fontWeight: '800', color: '#FFFFFF' }}>Mark All Present</Text>
              </TouchableOpacity>
            </View>

            {/* Student Attendance List with Present / Absent / Leave Controls */}
            {currentStudents.map((st) => {
              const currentStatus = dailyAttendanceRecords[st.id] || 'Present';
              return (
                <View
                  key={st.id}
                  style={[
                    styles.studentPortalBtnCard,
                    userRole === 'admin' && { backgroundColor: '#1E293B', borderColor: '#334155' },
                    { marginBottom: 8, paddingVertical: 10 }
                  ]}
                >
                  <Image source={{ uri: st.avatar }} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.studentPortalBtnTitle, userRole === 'admin' && { color: '#F8FAFC' }]}>
                      #{st.roll} {st.name}
                    </Text>
                    <Text style={{ fontSize: 11, color: userRole === 'admin' ? '#94A3B8' : '#64748B', marginTop: 1 }}>
                      {st.admissionNo} • Overall Att: {st.attendancePercent}
                    </Text>
                  </View>

                  {/* 3 Interactive Status Controls (P | A | L) */}
                  <View style={{ flexDirection: 'row', gap: 4 }}>
                    {/* Present */}
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 8,
                        backgroundColor: currentStatus === 'Present' ? '#10B981' : userRole === 'admin' ? '#334155' : '#F1F5F9',
                      }}
                      onPress={() => {
                        setDailyAttendanceRecords((prev) => ({ ...prev, [st.id]: 'Present' }));
                      }}
                    >
                      <Text style={{ fontSize: 11, fontWeight: '800', color: currentStatus === 'Present' ? '#FFFFFF' : '#64748B' }}>
                        P
                      </Text>
                    </TouchableOpacity>

                    {/* Absent */}
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 8,
                        backgroundColor: currentStatus === 'Absent' ? '#EF4444' : userRole === 'admin' ? '#334155' : '#F1F5F9',
                      }}
                      onPress={() => {
                        setDailyAttendanceRecords((prev) => ({ ...prev, [st.id]: 'Absent' }));
                      }}
                    >
                      <Text style={{ fontSize: 11, fontWeight: '800', color: currentStatus === 'Absent' ? '#FFFFFF' : '#64748B' }}>
                        A
                      </Text>
                    </TouchableOpacity>

                    {/* Leave */}
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 8,
                        backgroundColor: currentStatus === 'Leave' ? '#2563EB' : userRole === 'admin' ? '#334155' : '#F1F5F9',
                      }}
                      onPress={() => {
                        setDailyAttendanceRecords((prev) => ({ ...prev, [st.id]: 'Leave' }));
                      }}
                    >
                      <Text style={{ fontSize: 11, fontWeight: '800', color: currentStatus === 'Leave' ? '#FFFFFF' : '#64748B' }}>
                        L
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}

            {/* Save Attendance Big Floating Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.loginSignInButton, { backgroundColor: '#10B981', marginTop: 14, marginBottom: 28 }]}
              onPress={handleSaveAttendance}
            >
              <Ionicons name="cloud-upload-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.signInButtonText}>Save & Broadcast Attendance</Text>
            </TouchableOpacity>
          </ScrollView>

          {userRole === 'admin' ? renderAdminTabBar() : renderTabBar()}
        </SafeAreaView>
      </View>
    );
  };

  // ==========================================
  // SCREEN 2-G: MOBILE REPORT-CARD SCREEN (EXACT TO DESIGN)
  // ==========================================
  const renderReportCardScreen = () => {
    // Current student for report card (defaults to Aarav for student, or selected student)
    const activeStudentId = selectedStudentForReport?.id || (userRole === 'parent' ? (parentSelectedChild === 'Rita Sharma' ? 4 : 1) : 1);
    const reportData = studentReportCardData[activeStudentId] || studentReportCardData[1];
    const remarks = reportCardTeacherRemarks[activeStudentId] || reportCardTeacherRemarks[1];

    const terms = ['First Term 2023-2024', 'Mid-Term 2023-2024', 'Annual Term 2023-2024'];

    const handleGeneratePdf = () => {
      showAlert(
        'Generating Official A4 PDF 📄',
        `Report Card for ${reportData.studentName} (${reportData.grade}) is being rendered with academic seals, grades, and teacher remarks. File: ReportCard_${reportData.admissionNo}.pdf`
      );
    };

    const handlePrint = () => {
      showAlert(
        'Print Dispatch 🖨️',
        `Connecting to wireless campus network printer...\nDocument: ${reportData.examName} - ${reportData.studentName}\nPaper: A4 Portrait, High-Resolution 300 DPI.`
      );
    };

    return (
      <View style={styles.phoneFrame}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
          {/* Top Blue Header exactly matching user screenshot */}
          <View style={{ backgroundColor: '#1E3A8A', paddingHorizontal: 16, paddingTop: Platform.OS === 'android' ? 36 : 14, paddingBottom: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <TouchableOpacity
                onPress={() => {
                  if (userRole === 'admin') setCurrentScreen('edusphere_admin');
                  else if (userRole === 'teacher') setCurrentScreen('teacher_exams');
                  else if (userRole === 'parent') setCurrentScreen('parent_dashboard');
                  else setCurrentScreen('dashboard');
                }}
                style={{ padding: 6 }}
              >
                <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
              </TouchableOpacity>

              {/* School System Modern Brand Logo Icon */}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Svg width={36} height={36} viewBox="0 0 40 40">
                  <Path d="M8 12 L20 6 L32 12 L20 18 Z" fill="#38BDF8" />
                  <Path d="M8 16 L20 22 L32 16 L20 22 Z" fill="#67E8F9" />
                  <Path d="M8 22 L20 28 L32 22" stroke="#FFFFFF" strokeWidth={2.5} fill="none" strokeLinecap="round" />
                  <Path d="M14 15 V 27 M26 15 V 27" stroke="#FFFFFF" strokeWidth={2.5} strokeLinecap="round" />
                </Svg>
                <View style={{ marginLeft: 6 }}>
                  <Text style={{ fontSize: 13, fontWeight: '900', color: '#FFFFFF', letterSpacing: 0.5, lineHeight: 14 }}>SCHOOL</Text>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: '#93C5FD', letterSpacing: 1.5, lineHeight: 13 }}>SYSTEM</Text>
                </View>
              </View>

              {/* A4 Preview Quick Icon */}
              <TouchableOpacity
                onPress={() => setA4ReportPreviewVisible(true)}
                style={{ backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 }}
              >
                <Text style={{ fontSize: 11, fontWeight: '800', color: '#FFFFFF' }}>A4 PDF</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={{ flex: 1, paddingHorizontal: 18 }} showsVerticalScrollIndicator={false}>
            {/* Term Selector Header exactly as in attached screenshot */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 18, marginBottom: 14 }}>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() => {
                  const nextTerm = reportCardTerm === 'First Term 2023-2024' ? 'Mid-Term 2023-2024' : 'First Term 2023-2024';
                  setReportCardTerm(nextTerm);
                }}
              >
                <View>
                  <Text style={{ fontSize: 17, fontWeight: '800', color: '#0F172A' }}>
                    {reportCardTerm.split(' ')[0]} {reportCardTerm.split(' ')[1]}
                  </Text>
                  <Text style={{ fontSize: 13, fontWeight: '600', color: '#64748B', marginTop: 1 }}>
                    {reportCardTerm.split(' ')[2] || '2023-2024'}
                  </Text>
                </View>
                <Ionicons name="swap-vertical" size={18} color="#475569" style={{ marginLeft: 8 }} />
              </TouchableOpacity>

              {/* Student Identification Pill */}
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 13, fontWeight: '800', color: '#1E3A8A' }}>{reportData.studentName}</Text>
                <Text style={{ fontSize: 11, color: '#64748B' }}>{reportData.grade} • Roll #{reportData.roll}</Text>
              </View>
            </View>

            {/* Horizontal Scroll of Subject Marks Cards (Exact match to screenshot cards) */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -18, paddingHorizontal: 18, marginBottom: 20 }}>
              {reportData.subjects.map((sub, idx) => (
                <View
                  key={idx}
                  style={{
                    width: 220,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 20,
                    padding: 16,
                    marginRight: 14,
                    borderWidth: 1,
                    borderColor: '#F1F5F9',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.05,
                    shadowRadius: 10,
                    elevation: 3,
                  }}
                >
                  {/* Top Subject Code Box + Name */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
                    <View style={{ width: 46, height: 46, borderRadius: 12, backgroundColor: sub.headerBg, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                      <Text style={{ fontSize: 12, fontWeight: '900', color: '#FFFFFF' }}>{sub.code}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 14, fontWeight: '800', color: '#0F172A' }} numberOfLines={1}>
                        {sub.name}
                      </Text>
                      <Text style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{sub.term}</Text>
                    </View>
                  </View>

                  {/* Circular Dial Indicator & Obtained Marks */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 6 }}>
                    {/* Ring gauge simulation */}
                    <View style={{ width: 56, height: 56, alignItems: 'center', justifyContent: 'center' }}>
                      <Svg width={56} height={56} viewBox="0 0 50 50">
                        <Circle cx="25" cy="25" r="20" stroke="#F1F5F9" strokeWidth="4.5" fill="none" />
                        <Circle
                          cx="25"
                          cy="25"
                          r="20"
                          stroke={sub.color}
                          strokeWidth="4.5"
                          strokeDasharray="125"
                          strokeDashoffset={125 - (125 * sub.pct) / 100}
                          strokeLinecap="round"
                          fill="none"
                          transform="rotate(-90 25 25)"
                        />
                      </Svg>
                      <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 11, fontWeight: '800', color: '#0F172A' }}>{sub.pct}%</Text>
                      </View>
                    </View>

                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={{ fontSize: 20, fontWeight: '900', color: '#0F172A' }}>{sub.score}</Text>
                      <Text style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{sub.avg}</Text>
                    </View>
                  </View>

                  {/* Footer Status & Grade Badge */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, borderTopWidth: 1, borderTopColor: '#F8FAFC', paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center', marginRight: 6 }}>
                        <Ionicons name="trending-up" size={16} color="#2563EB" />
                      </View>
                      <View>
                        <Text style={{ fontSize: 9, color: '#94A3B8', fontWeight: '700' }}>Status</Text>
                        <Text style={{ fontSize: 11, fontWeight: '800', color: '#F59E0B' }}>{sub.status}</Text>
                      </View>
                    </View>

                    <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#ECFDF5', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ fontSize: 13, fontWeight: '900', color: '#059669' }}>{sub.grade}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Summary Section (Exact representation of bottom card in user screenshot) */}
            <Text style={{ fontSize: 17, fontWeight: '800', color: '#0F172A', marginBottom: 12 }}>Summary</Text>

            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 22,
                padding: 18,
                borderWidth: 1,
                borderColor: '#F1F5F9',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 10,
                elevation: 3,
                marginBottom: 16,
              }}
            >
              {/* Row 1: Large Ring (55%) + Obt Marks (246/450) + Grade (B) */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' }}>
                {/* 55% Main Donut Ring */}
                <View style={{ width: 84, height: 84, alignItems: 'center', justifyContent: 'center' }}>
                  <Svg width={84} height={84} viewBox="0 0 60 60">
                    <Circle cx="30" cy="30" r="24" stroke="#F1F5F9" strokeWidth="5.5" fill="none" />
                    <Circle
                      cx="30"
                      cy="30"
                      r="24"
                      stroke="#1E3A8A"
                      strokeWidth="5.5"
                      strokeDasharray="150"
                      strokeDashoffset={150 - (150 * reportData.overallPct) / 100}
                      strokeLinecap="round"
                      fill="none"
                      transform="rotate(-90 30 30)"
                    />
                  </Svg>
                  <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: '900', color: '#0F172A' }}>{reportData.overallPct}%</Text>
                  </View>
                </View>

                {/* Right Metrics: Obt Marks & Grade */}
                <View style={{ flex: 1, marginLeft: 22 }}>
                  {/* Obt Marks */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: '#DCFCE7', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                      <Ionicons name="checkmark" size={18} color="#16A34A" />
                    </View>
                    <View>
                      <Text style={{ fontSize: 11, color: '#94A3B8', fontWeight: '600' }}>Obt Marks</Text>
                      <Text style={{ fontSize: 16, fontWeight: '900', color: '#0F172A' }}>
                        {reportData.obtainedMarks} / {reportData.maxMarks}
                      </Text>
                    </View>
                  </View>

                  {/* Grade */}
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: '#FFEDD5', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                      <Ionicons name="ribbon-outline" size={18} color="#EA580C" />
                    </View>
                    <View>
                      <Text style={{ fontSize: 11, color: '#94A3B8', fontWeight: '600' }}>Grade</Text>
                      <Text style={{ fontSize: 16, fontWeight: '900', color: '#0F172A' }}>
                        {reportData.gradeAwarded}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Row 2: Rank (3rd) + Result (PASSED) */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                    <Ionicons name="stats-chart" size={17} color="#64748B" />
                  </View>
                  <View>
                    <Text style={{ fontSize: 11, color: '#94A3B8', fontWeight: '600' }}>Rank</Text>
                    <Text style={{ fontSize: 15, fontWeight: '800', color: '#0F172A' }}>{reportData.rank}</Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: '#ECFDF5', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                    <Ionicons name="trending-up" size={17} color="#10B981" />
                  </View>
                  <View>
                    <Text style={{ fontSize: 11, color: '#94A3B8', fontWeight: '600' }}>Result</Text>
                    <Text style={{ fontSize: 15, fontWeight: '900', color: '#F59E0B' }}>{reportData.result}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Teacher Remarks Box with quick editing for Teacher / Admin */}
            <View style={{ backgroundColor: '#FFFFFF', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: '#F1F5F9', marginBottom: 16 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Text style={{ fontSize: 12, fontWeight: '800', color: '#1E3A8A', textTransform: 'uppercase' }}>
                  CLASS TEACHER'S REMARKS
                </Text>
                {userRole === 'teacher' && (
                  <TouchableOpacity
                    onPress={() => {
                      showAlert('Edit Remarks', 'Teacher can add personalized academic feedback to the student profile.');
                    }}
                  >
                    <Text style={{ fontSize: 11, fontWeight: '700', color: '#2563EB' }}>Edit Remarks</Text>
                  </TouchableOpacity>
                )}
              </View>
              <Text style={{ fontSize: 13, color: '#334155', lineHeight: 18, fontStyle: 'italic' }}>
                "{remarks}"
              </Text>
              <Text style={{ fontSize: 11, color: '#94A3B8', marginTop: 8 }}>
                — Mrs. Sarah Jenkins (Class Mentor & Mathematics Dept)
              </Text>
            </View>

            {/* Print & Generate PDF Primary Actions Bar */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginBottom: 28 }}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={[styles.loginSignInButton, { flex: 1, backgroundColor: '#1E3A8A', marginTop: 0 }]}
                onPress={() => setA4ReportPreviewVisible(true)}
              >
                <Ionicons name="document-text-outline" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text style={styles.signInButtonText}>A4 Preview</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                style={[styles.loginSignInButton, { flex: 1, backgroundColor: '#059669', marginTop: 0 }]}
                onPress={handleGeneratePdf}
              >
                <Ionicons name="download-outline" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text style={styles.signInButtonText}>Generate PDF</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                style={[styles.loginSignInButton, { width: 50, backgroundColor: '#334155', marginTop: 0, paddingHorizontal: 0 }]}
                onPress={handlePrint}
              >
                <Ionicons name="print-outline" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </ScrollView>

          {userRole === 'admin' ? renderAdminTabBar() : renderTabBar()}
        </SafeAreaView>
      </View>
    );
  };


  // ==========================================
  // SCREEN 2-D: PARENT MOBILE DASHBOARD (EXACT TO DESIGN)
  // ==========================================
  const renderParentDashboardScreen = () => {
    // Registered children under Madhuri Sharma
    const childrenList = [
      {
        id: 'rita',
        name: 'Rita Sharma',
        grade: 'Class 4-B',
        roll: '24',
        attendance: '83.33%',
        avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&q=80',
        feeStatus: 'Paid',
        pendingHomework: '2 Due',
      },
      {
        id: 'rohan',
        name: 'Rohan Sharma',
        grade: 'Class 7-A',
        roll: '12',
        attendance: '92.40%',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&q=80',
        feeStatus: '₹4,500 Due',
        pendingHomework: '1 Due',
      },
      {
        id: 'jyoti',
        name: 'Jyoti Sharma',
        grade: 'KG-II',
        roll: '08',
        attendance: '96.10%',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80',
        feeStatus: 'Paid',
        pendingHomework: 'All Clear',
      },
    ];

    const currentChild =
      childrenList.find((c) => c.name === parentSelectedChild) || childrenList[0];

    // Attendance Calendar Days (August 2019 - as in screenshot)
    // green = present, red = absent, white = weekend / normal
    const calendarDays = [
      { day: 28, isCurrentMonth: false, status: 'none' },
      { day: 29, isCurrentMonth: false, status: 'none' },
      { day: 30, isCurrentMonth: false, status: 'none' },
      { day: 31, isCurrentMonth: false, status: 'none' },
      { day: 1, isCurrentMonth: true, status: 'present' },
      { day: 2, isCurrentMonth: true, status: 'present' },
      { day: 3, isCurrentMonth: true, status: 'none' },

      { day: 4, isCurrentMonth: true, status: 'none' },
      { day: 5, isCurrentMonth: true, status: 'absent' },
      { day: 6, isCurrentMonth: true, status: 'present' },
      { day: 7, isCurrentMonth: true, status: 'present' },
      { day: 8, isCurrentMonth: true, status: 'present' },
      { day: 9, isCurrentMonth: true, status: 'present' },
      { day: 10, isCurrentMonth: true, status: 'none' },

      { day: 11, isCurrentMonth: true, status: 'none' },
      { day: 12, isCurrentMonth: true, status: 'present' },
      { day: 13, isCurrentMonth: true, status: 'present' },
      { day: 14, isCurrentMonth: true, status: 'present' },
      { day: 15, isCurrentMonth: true, status: 'absent' },
      { day: 16, isCurrentMonth: true, status: 'absent' },
      { day: 17, isCurrentMonth: true, status: 'none' },

      { day: 18, isCurrentMonth: true, status: 'none' },
      { day: 19, isCurrentMonth: true, status: 'present' },
      { day: 20, isCurrentMonth: true, status: 'present' },
      { day: 21, isCurrentMonth: true, status: 'present' },
      { day: 22, isCurrentMonth: true, status: 'present' },
      { day: 23, isCurrentMonth: true, status: 'present' },
      { day: 24, isCurrentMonth: true, status: 'none' },

      { day: 25, isCurrentMonth: true, status: 'none' },
      { day: 26, isCurrentMonth: true, status: 'absent' },
      { day: 27, isCurrentMonth: true, status: 'none' },
      { day: 28, isCurrentMonth: true, status: 'none' },
      { day: 29, isCurrentMonth: true, status: 'none' },
      { day: 30, isCurrentMonth: true, status: 'none' },
      { day: 31, isCurrentMonth: true, status: 'none' },
    ];

    // Parent Bottom Navigation Bar (Home | Diary | Calendar | Messages | Profile)
    const renderParentBottomNav = () => (
      <View style={styles.parentBottomNavBar}>
        {[
          { id: 'Home', icon: 'home', label: 'Home', screen: 'home' },
          { id: 'Diary', icon: 'book', label: 'Diary', screen: 'feed' },
          { id: 'Calendar', icon: 'calendar', label: 'Calendar', screen: 'attendance' },
          { id: 'Messages', icon: 'chatbubbles', label: 'Messages', screen: 'messages' },
          { id: 'Profile', icon: 'person', label: 'Profile', screen: 'settings' },
        ].map((tab) => {
          const isActive = parentActiveTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.parentBottomNavTab}
              activeOpacity={0.8}
              onPress={() => {
                setParentActiveTab(tab.id);
                if (tab.id === 'Home') {
                  setParentSubScreen('home');
                } else if (tab.id === 'Diary') {
                  setParentSubScreen('feed');
                } else if (tab.id === 'Calendar') {
                  setParentSubScreen('attendance');
                } else if (tab.id === 'Messages') {
                  showAlert('School Messages', `Chat with ${currentChild.name}'s Class Teacher & Admin desk.`);
                } else if (tab.id === 'Profile') {
                  setParentDrawerModal(true);
                }
              }}
            >
              <Ionicons
                name={isActive ? tab.icon : `${tab.icon}-outline`}
                size={22}
                color={isActive ? '#1D4ED8' : '#94A3B8'}
              />
              <Text
                style={[
                  styles.parentBottomNavText,
                  isActive && styles.parentBottomNavTextActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );

    // ==========================================
    // VIEW 1: PARENT MAIN DASHBOARD (Screen 1 in attached image)
    // ==========================================
    const renderParentMainHomeView = () => (
      <ScrollView
        style={{ flex: 1, backgroundColor: '#F8FAFC' }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Curved Blue Hero Header with Wave Effect */}
        <View style={styles.parentHeaderContainer}>
          <SafeAreaView>
            <View style={styles.parentTopBarRow}>
              {/* Menu Drawer Hamburger */}
              <TouchableOpacity
                style={styles.parentRoundIconBtn}
                onPress={() => setParentDrawerModal(true)}
              >
                <Ionicons name="menu-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>

              {/* Greeting */}
              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={styles.parentGreetingSub}>Welcome back</Text>
                <Text style={styles.parentGreetingName}>Madhuri Sharma</Text>
              </View>

              {/* Notification Bell */}
              <TouchableOpacity
                style={[styles.parentRoundIconBtn, { marginRight: 10 }]}
                onPress={() => {
                  setCurrentScreen('notifications');
                  setActiveTab('Notifications');
                }}
              >
                <Ionicons name="notifications-outline" size={22} color="#FFFFFF" />
                <View style={styles.parentNotifDot} />
              </TouchableOpacity>

              {/* Parent Profile Avatar */}
              <TouchableOpacity
                onPress={() => {
                  showAlert('Parent Profile', 'Madhuri Sharma\nParent ID: PAR-2026-88\nVerified Phone: +91 98450 12345');
                }}
              >
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80',
                  }}
                  style={styles.parentAvatarImg}
                />
              </TouchableOpacity>
            </View>

            {/* Child Selector Strip in Header */}
            <View style={styles.parentChildSwitcherWrap}>
              <Text style={styles.parentChildSwitcherLabel}>Select Child:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 6 }}>
                {childrenList.map((ch) => {
                  const isChActive = ch.name === currentChild.name;
                  return (
                    <TouchableOpacity
                      key={ch.id}
                      style={[
                        styles.parentChildPill,
                        isChActive && styles.parentChildPillActive,
                      ]}
                      onPress={() => {
                        setParentSelectedChild(ch.name);
                      }}
                      activeOpacity={0.8}
                    >
                      <Image source={{ uri: ch.avatar }} style={styles.parentChildPillAvatar} />
                      <View style={{ marginLeft: 6 }}>
                        <Text
                          style={[
                            styles.parentChildPillName,
                            isChActive && styles.parentChildPillNameActive,
                          ]}
                        >
                          {ch.name}
                        </Text>
                        <Text
                          style={[
                            styles.parentChildPillGrade,
                            isChActive && styles.parentChildPillGradeActive,
                          ]}
                        >
                          {ch.grade}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </SafeAreaView>

          {/* Decorative Wave Svg Curve */}
          <Svg
            height={32}
            width="100%"
            viewBox="0 0 1440 320"
            style={{ position: 'absolute', bottom: -1, left: 0, right: 0 }}
          >
            <Path
              fill="#F8FAFC"
              d="M0,192L48,197.3C96,203,192,213,288,197.3C384,181,480,139,576,144C672,149,768,203,864,218.7C960,235,1056,213,1152,192C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </Svg>
        </View>

        {/* Top Two Quick Cards: Daily Homework & Fee Payment (Exact to Design) */}
        <View style={styles.parentTopCardsRow}>
          <TouchableOpacity
            style={styles.parentTopActionCard}
            activeOpacity={0.85}
            onPress={() => {
              showAlert(
                `${currentChild.name}'s Homework`,
                `Assigned for today:\n1. Maths: Chapter 5 Fractions (Due Tomorrow)\n2. Science: Plant Cells Diagrams (Submitted)\n3. English: Essay writing on Environmental Protection (Pending)`,
              );
            }}
          >
            <View style={styles.parentCardIconWrapBlue}>
              <Ionicons name="book-outline" size={24} color="#2563EB" />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.parentCardTitle}>Daily Homework</Text>
              <Text style={styles.parentCardSub}>{currentChild.pendingHomework}</Text>
            </View>
            <View style={styles.parentBlueDotIndicator} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.parentTopActionCard}
            activeOpacity={0.85}
            onPress={() => {
              const matchedLedger = studentFeeLedger.find((s) => s.studentName.toLowerCase().includes(currentChild.name.toLowerCase().split(' ')[0])) || studentFeeLedger[0];
              setSelectedReceiptTxn({
                receiptNo: matchedLedger.receiptNo,
                txnId: matchedLedger.paymentHistory[matchedLedger.paymentHistory.length - 1]?.txnId || 'TXN-904',
                studentName: matchedLedger.studentName,
                admissionNo: matchedLedger.admissionNo,
                grade: matchedLedger.grade,
                term: 'Term 2 Tuition & Activities',
                amount: matchedLedger.paidAmount,
                date: matchedLedger.lastPaymentDate,
                mode: 'UPI NetBanking',
                status: matchedLedger.status === 'Paid' ? 'PAID' : 'PENDING',
                pendingBalance: matchedLedger.pendingBalance,
                totalFee: matchedLedger.totalFee,
              });
              setReceiptDetailModalVisible(true);
            }}
          >
            <View style={styles.parentCardIconWrapCyan}>
              <Ionicons name="card-outline" size={24} color="#0284C7" />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.parentCardTitle}>Fee Payment</Text>
              <Text style={[styles.parentCardSub, { color: currentChild.feeStatus.includes('Due') ? '#D97706' : '#10B981' }]}>
                {currentChild.feeStatus}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Carousel Pagination Dots */}
        <View style={styles.parentDotsRow}>
          <View style={[styles.parentMiniDot, styles.parentMiniDotActive]} />
          <View style={styles.parentMiniDot} />
          <View style={styles.parentMiniDot} />
        </View>

        {/* 6 Grid Service Cards (Your Feed, Attendance, Assessments, Messages, School Calendar, Staff Information) */}
        <View style={styles.parentGridCardsContainer}>
          {/* 1. Your Feed */}
          <TouchableOpacity
            style={styles.parentGridCard}
            activeOpacity={0.85}
            onPress={() => {
              setParentSubScreen('feed');
              setParentActiveTab('Diary');
            }}
          >
            <View style={styles.parentGridCardHeader}>
              <Ionicons name="radio-outline" size={20} color="#2563EB" />
              <Text style={styles.parentGridCardTitle}>Your Feed</Text>
            </View>
            <Text style={styles.parentGridCardDesc}>
              Daily diary, school activities, craft prizes & classroom achievements.
            </Text>
          </TouchableOpacity>

          {/* 2. Attendance */}
          <TouchableOpacity
            style={styles.parentGridCard}
            activeOpacity={0.85}
            onPress={() => {
              setParentSubScreen('attendance');
              setParentActiveTab('Calendar');
            }}
          >
            <View style={styles.parentGridCardHeader}>
              <Ionicons name="calendar-outline" size={20} color="#2563EB" />
              <Text style={styles.parentGridCardTitle}>Attendance</Text>
            </View>
            <Text style={styles.parentGridCardDesc}>
              {currentChild.attendance} monthly average. Tap for complete August calendar.
            </Text>
          </TouchableOpacity>

          {/* 3. Assessments */}
          <TouchableOpacity
            style={styles.parentGridCard}
            activeOpacity={0.85}
            onPress={() => {
              const matchedChild = masterStudentsList.find((s) => s.name === currentChild.name) || masterStudentsList[3];
              setSelectedStudentForReport(matchedChild);
              setCurrentScreen('report_card');
            }}
          >
            <View style={styles.parentGridCardHeader}>
              <Ionicons name="checkbox-outline" size={20} color="#2563EB" />
              <Text style={styles.parentGridCardTitle}>Assessments</Text>
            </View>
            <Text style={styles.parentGridCardDesc}>
              Report cards, periodic quizzes & terminal examination scores.
            </Text>
          </TouchableOpacity>

          {/* 4. Messages */}
          <TouchableOpacity
            style={styles.parentGridCard}
            activeOpacity={0.85}
            onPress={() => {
              showAlert(
                'Teacher Messages',
                `Direct messaging with ${currentChild.name}'s Class Teacher.\nLast Message: "Rita showed remarkable creativity in the Craft Competition!"`,
              );
            }}
          >
            <View style={styles.parentGridCardHeader}>
              <Ionicons name="paper-plane-outline" size={20} color="#2563EB" />
              <Text style={styles.parentGridCardTitle}>Messages</Text>
            </View>
            <Text style={styles.parentGridCardDesc}>
              Direct communication channel with teachers and administration.
            </Text>
          </TouchableOpacity>

          {/* 5. School Calendar */}
          <TouchableOpacity
            style={styles.parentGridCard}
            activeOpacity={0.85}
            onPress={() => {
              showAlert(
                'Academic Year Calendar',
                'Upcoming Dates:\n• 30 Aug: Elocution Competition\n• 02 Sep: Ganesh Chaturthi (Holiday)\n• 05 Sep: Teachers Day Special Assembly\n• 20 Oct: Term 1 Final Exams',
              );
            }}
          >
            <View style={styles.parentGridCardHeader}>
              <Ionicons name="calendar-number-outline" size={20} color="#2563EB" />
              <Text style={styles.parentGridCardTitle}>School Calendar</Text>
            </View>
            <Text style={styles.parentGridCardDesc}>
              Term schedules, parent-teacher meetings, holidays & events.
            </Text>
          </TouchableOpacity>

          {/* 6. Staff Information */}
          <TouchableOpacity
            style={styles.parentGridCard}
            activeOpacity={0.85}
            onPress={() => {
              showAlert(
                'Assigned Faculty Directory',
                `Teachers for ${currentChild.grade}:\n• Class Teacher: Mrs. Sarah Jenkins\n• Science: Dr. Robert Allen\n• English: Ms. Elizabeth Stone\n• Arts & Crafts: Ms. Neha Roy`,
              );
            }}
          >
            <View style={styles.parentGridCardHeader}>
              <Ionicons name="people-outline" size={20} color="#2563EB" />
              <Text style={styles.parentGridCardTitle}>Staff Information</Text>
            </View>
            <Text style={styles.parentGridCardDesc}>
              Contact details and consultation hours for subject teachers.
            </Text>
          </TouchableOpacity>

          {/* 7. Linked Child Details & Academic Record */}
          <TouchableOpacity
            style={[styles.parentGridCard, { width: '100%', backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }]}
            activeOpacity={0.85}
            onPress={() => {
              const matchedChild = masterStudentsList.find((s) => s.name === currentChild.name) || masterStudentsList[3];
              setSelectedStudentForDetail(matchedChild);
              setStudentDetailModalVisible(true);
            }}
          >
            <View style={styles.parentGridCardHeader}>
              <Ionicons name="school" size={20} color="#1D4ED8" />
              <Text style={[styles.parentGridCardTitle, { color: '#1D4ED8' }]}>{currentChild.name}'s Complete Student Record</Text>
            </View>
            <Text style={[styles.parentGridCardDesc, { color: '#2563EB' }]}>
              Admission No, guardian contacts, previous terms academic history & status.
            </Text>
          </TouchableOpacity>
        </View>

        {/* Notice Board Banner Card (Bottom of Screen 1) */}
        <TouchableOpacity
          style={styles.parentNoticeBoardCard}
          activeOpacity={0.85}
          onPress={() => setParentNoticeModal(true)}
        >
          <View style={styles.parentNoticeBoardIndicator} />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.parentNoticeBoardTitle}>Notice Board</Text>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </View>
          <Text style={styles.parentNoticeBoardBody} numberOfLines={2}>
            School closing early on Friday for Inter-School cultural meet preparation. Transport routes will depart at 1:30 PM.
          </Text>
        </TouchableOpacity>

        <View style={{ height: 24 }} />
      </ScrollView>
    );

    // ==========================================
    // VIEW 2: ATTENDANCE CALENDAR (Screen 2 in attached image)
    // ==========================================
    const renderParentAttendanceView = () => (
      <ScrollView
        style={{ flex: 1, backgroundColor: '#FFFFFF' }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Navy Header with Title & Child Switcher & Big Average */}
        <View style={styles.parentAttHeader}>
          <SafeAreaView>
            <View style={styles.parentAttNavRow}>
              <TouchableOpacity
                onPress={() => setParentSubScreen('home')}
                style={styles.parentRoundIconBtn}
              >
                <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
              </TouchableOpacity>

              <Text style={styles.parentAttTitle}>Attendance</Text>

              <TouchableOpacity
                onPress={() => setParentSubScreen('home')}
                style={{ marginRight: 12 }}
              >
                <Ionicons name="home-outline" size={22} color="#FFFFFF" />
              </TouchableOpacity>

              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80' }}
                style={styles.parentAvatarSmall}
              />
            </View>

            {/* Child Avatar & Dropdown Selector + Big 83.33% */}
            <View style={styles.parentAttSummaryRow}>
              <TouchableOpacity
                style={styles.parentAttChildSelector}
                onPress={() => setParentChildDropdownVisible(!parentChildDropdownVisible)}
                activeOpacity={0.8}
              >
                <Image source={{ uri: currentChild.avatar }} style={styles.parentAttChildAvatar} />
                <Text style={styles.parentAttChildName}>{currentChild.name}</Text>
                <Ionicons name="chevron-down" size={16} color="#FFFFFF" style={{ marginLeft: 4 }} />
              </TouchableOpacity>

              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.parentAttAvgLabel}>Average attendance</Text>
                <Text style={styles.parentAttAvgValue}>{currentChild.attendance}</Text>
              </View>
            </View>

            {/* Dropdown Options */}
            {parentChildDropdownVisible && (
              <View style={styles.parentChildDropdownMenu}>
                {childrenList.map((ch) => (
                  <TouchableOpacity
                    key={ch.id}
                    style={styles.parentChildDropdownItem}
                    onPress={() => {
                      setParentSelectedChild(ch.name);
                      setParentChildDropdownVisible(false);
                    }}
                  >
                    <Image source={{ uri: ch.avatar }} style={{ width: 24, height: 24, borderRadius: 12, marginRight: 8 }} />
                    <Text style={{ fontSize: 13, fontWeight: '600', color: '#0F172A' }}>{ch.name}</Text>
                    <Text style={{ fontSize: 11, color: '#64748B', marginLeft: 'auto' }}>{ch.grade}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </SafeAreaView>
        </View>

        {/* Month Selector Bar with Calendar & Menu Icons */}
        <View style={styles.parentAttMonthBar}>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
              showAlert('Select Month', 'August 2019 selected (Academic Term 1).');
            }}
          >
            <Text style={styles.parentAttMonthText}>{parentAttendanceMonth}</Text>
            <Ionicons name="chevron-down" size={16} color="#0F172A" style={{ marginLeft: 4 }} />
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => showAlert('Calendar View', 'Viewing monthly breakdown.')}
              style={{ marginRight: 14 }}
            >
              <Ionicons name="calendar-outline" size={20} color="#0F172A" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showAlert('Attendance Filter', 'Filter by holidays or leaves.')}>
              <Ionicons name="ellipsis-vertical" size={20} color="#0F172A" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Calendar Day Labels */}
        <View style={styles.parentCalWeekHeader}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
            <Text key={idx} style={styles.parentCalWeekDayText}>
              {day}
            </Text>
          ))}
        </View>

        {/* Calendar Grid (Days 1 to 31 with green & red circles) */}
        <View style={styles.parentCalGrid}>
          {calendarDays.map((item, idx) => (
            <View key={idx} style={styles.parentCalCell}>
              {item.status === 'present' ? (
                <View style={styles.parentCalCircleGreen}>
                  <Text style={styles.parentCalTextWhite}>{item.day}</Text>
                </View>
              ) : item.status === 'absent' ? (
                <View style={styles.parentCalCircleRed}>
                  <Text style={styles.parentCalTextWhite}>{item.day}</Text>
                </View>
              ) : (
                <Text
                  style={[
                    styles.parentCalTextNormal,
                    !item.isCurrentMonth && { color: '#CBD5E1' },
                  ]}
                >
                  {item.day}
                </Text>
              )}
            </View>
          ))}
        </View>

        {/* Upcoming Events Section (Bottom of Screen 2) */}
        <View style={styles.parentUpcomingSection}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Text style={styles.parentUpcomingTitle}>Upcoming Events</Text>
            <TouchableOpacity onPress={() => showAlert('All Events', 'Displaying full school activity schedule.')}>
              <Text style={styles.parentUpcomingViewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Event 1: Elocution Competition (30 Aug) */}
          <TouchableOpacity
            style={styles.parentEventCard}
            activeOpacity={0.8}
            onPress={() => showAlert('Elocution Competition', 'Date: 30 Aug 2019\nTime: 10:00 AM\nVenue: School Auditorium\n23 students participating from Grade 4.')}
          >
            <View style={styles.parentEventDateBadgeBlue}>
              <Text style={styles.parentEventDateNum}>30</Text>
              <Text style={styles.parentEventDateMonth}>Aug</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.parentEventName}>Elocution competition</Text>
              <Text style={styles.parentEventMeta}>23 students participating</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>

          {/* Event 2: Ganesh Chaturthi (2 Sep) */}
          <TouchableOpacity
            style={styles.parentEventCard}
            activeOpacity={0.8}
            onPress={() => showAlert('Ganesh Chaturthi', 'Date: 02 Sep 2019\nDeclared Government & School Holiday.\nCampus closed.')}
          >
            <View style={styles.parentEventDateBadgeBlue}>
              <Text style={styles.parentEventDateNum}>2</Text>
              <Text style={styles.parentEventDateMonth}>Sep</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.parentEventName}>Ganesh Chaturthi</Text>
              <Text style={styles.parentEventMeta}>School Holiday</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    );

    // ==========================================
    // VIEW 3: SMART FEED & DIARY (Screen 3 in attached image)
    // ==========================================
    const renderParentFeedView = () => (
      <ScrollView
        style={{ flex: 1, backgroundColor: '#FFFFFF' }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Navy Header with Feed title, child pills & search */}
        <View style={styles.parentFeedHeader}>
          <SafeAreaView>
            <View style={styles.parentAttNavRow}>
              <TouchableOpacity
                onPress={() => setParentSubScreen('home')}
                style={styles.parentRoundIconBtn}
              >
                <Ionicons name="menu-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>

              <Text style={styles.parentAttTitle}>Feed</Text>

              <TouchableOpacity
                onPress={() => setParentSubScreen('home')}
                style={{ marginRight: 12 }}
              >
                <Ionicons name="home-outline" size={22} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => showAlert('Search Feed', 'Search achievements, notices, and class posts.')}
                style={{ marginRight: 12 }}
              >
                <Ionicons name="search-outline" size={22} color="#FFFFFF" />
              </TouchableOpacity>

              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80' }}
                style={styles.parentAvatarSmall}
              />
            </View>

            {/* Child Horizontal Selector Badges (Rita, Rohan, Jyoti) */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 12, paddingBottom: 6 }}
            >
              {childrenList.map((ch) => {
                const isSelected = ch.name === currentChild.name;
                return (
                  <TouchableOpacity
                    key={ch.id}
                    style={[
                      styles.parentFeedChildPill,
                      isSelected && styles.parentFeedChildPillActive,
                    ]}
                    onPress={() => setParentSelectedChild(ch.name)}
                    activeOpacity={0.8}
                  >
                    <Image source={{ uri: ch.avatar }} style={styles.parentFeedChildAvatar} />
                    <Text
                      style={[
                        styles.parentFeedChildName,
                        isSelected && styles.parentFeedChildNameActive,
                      ]}
                    >
                      {ch.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Category Tabs: Feed | Class | School | Lead */}
            <View style={styles.parentFeedCatBar}>
              {['Feed', 'Class', 'School', 'Lead'].map((cat) => {
                const isCatActive = parentFeedCategory === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.parentFeedCatTab,
                      isCatActive && styles.parentFeedCatTabActive,
                    ]}
                    onPress={() => setParentFeedCategory(cat)}
                  >
                    <Text
                      style={[
                        styles.parentFeedCatText,
                        isCatActive && styles.parentFeedCatTextActive,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </SafeAreaView>
        </View>

        {/* Timeline Posts */}
        <View style={styles.parentTimelineContainer}>
          {/* Post 1: 17 Aug - 2nd Price in Craft */}
          <View style={styles.parentTimelinePost}>
            {/* Left Date Node */}
            <View style={styles.parentTimelineLeftCol}>
              <View style={styles.parentTimelineDateBadge}>
                <Text style={styles.parentTimelineDateNum}>17</Text>
                <Text style={styles.parentTimelineDateMonth}>Aug</Text>
              </View>
              <View style={styles.parentTimelineLine} />
            </View>

            {/* Right Post Content */}
            <View style={styles.parentTimelineRightCol}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.parentTimelinePostTitle}>2nd Price in Craft ⭐</Text>
                <TouchableOpacity onPress={() => showAlert('Shared', 'Post link copied to clipboard.')}>
                  <Text style={styles.parentTimelineShareText}>Share ↗</Text>
                </TouchableOpacity>
              </View>

              {/* Photos Gallery Grid (3 preview items + "+ View 2 more") */}
              <View style={styles.parentCraftPhotosRow}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=200&q=80' }}
                  style={styles.parentCraftImgSmall}
                />
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=200&q=80' }}
                  style={styles.parentCraftImgSmall}
                />
                <View style={styles.parentCraftImgMoreWrap}>
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=200&q=80' }}
                    style={StyleSheet.absoluteFillObject}
                  />
                  <View style={styles.parentCraftMoreOverlay}>
                    <Text style={styles.parentCraftMoreText}>View{'\n'}2 more</Text>
                  </View>
                </View>
              </View>

              {/* Sub-item: Sports Participation */}
              <View style={{ marginTop: 14 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={styles.parentTimelinePostTitle}>Sports Participation</Text>
                  <TouchableOpacity onPress={() => showAlert('Shared', 'Sports entry shared.')}>
                    <Text style={styles.parentTimelineShareText}>Share ↗</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.parentTimelineSubDesc}>
                  Participated in Red House Kho Kho match vs Blue House
                </Text>
              </View>
            </View>
          </View>

          {/* Post 2: 12 Aug - Became a Class Monitor */}
          <View style={styles.parentTimelinePost}>
            <View style={styles.parentTimelineLeftCol}>
              <View style={styles.parentTimelineDateBadge}>
                <Text style={styles.parentTimelineDateNum}>12</Text>
                <Text style={styles.parentTimelineDateMonth}>Aug</Text>
              </View>
              <View style={styles.parentTimelineLine} />
            </View>

            <View style={styles.parentTimelineRightCol}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.parentTimelinePostTitle}>Became a Class Monitor</Text>
                <TouchableOpacity onPress={() => showAlert('Shared', 'Announcement shared.')}>
                  <Text style={styles.parentTimelineShareText}>Share ↗</Text>
                </TouchableOpacity>
              </View>

              {/* Classroom Photo Banner */}
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80' }}
                style={styles.parentClassroomImg}
              />
            </View>
          </View>

          {/* Post 3: 10 Aug - Inter School Elocution competition */}
          <View style={styles.parentTimelinePost}>
            <View style={styles.parentTimelineLeftCol}>
              <View style={styles.parentTimelineDateBadge}>
                <Text style={styles.parentTimelineDateNum}>10</Text>
                <Text style={styles.parentTimelineDateMonth}>Aug</Text>
              </View>
            </View>

            <View style={styles.parentTimelineRightCol}>
              <Text style={styles.parentTimelinePostTitle}>Inter School Elocution competition</Text>
              <Text style={styles.parentTimelineSubDesc}>
                Participated in inter school elocution competition from Red House in elocution competition.
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    );

    return (
      <View style={styles.phoneFrame}>
        {parentSubScreen === 'home' && renderParentMainHomeView()}
        {parentSubScreen === 'attendance' && renderParentAttendanceView()}
        {parentSubScreen === 'feed' && renderParentFeedView()}

        {renderParentBottomNav()}
      </View>
    );
  };

  // ==========================================
  // STUDENT PORTAL SCREEN 1: TODAY'S TIMETABLE
  // ==========================================
  const renderStudentTimetableScreen = () => {
    const timetableToday = [
      { id: 1, time: '09:00', ampm: 'AM', subject: 'Mathematics', teacher: 'Mr. David Sharma', room: 'Room 204', status: 'Ongoing', color: '#2563EB', active: true },
      { id: 2, time: '10:15', ampm: 'AM', subject: 'Science Lab', teacher: 'Dr. Sarah Sen', room: 'Physics Lab 2', status: 'Next', color: '#10B981', active: false },
      { id: 3, time: '11:30', ampm: 'AM', subject: 'English Lit.', teacher: 'Ms. Clara Reed', room: 'Room 108', status: 'Upcoming', color: '#8B5CF6', active: false },
      { id: 4, time: '01:30', ampm: 'PM', subject: 'Social Studies', teacher: 'Mr. Robert Roy', room: 'Room 205', status: 'Upcoming', color: '#F59E0B', active: false },
    ];

    const timetableTomorrow = [
      { id: 101, time: '09:00', ampm: 'AM', subject: 'Hindi Lit.', teacher: 'Mrs. Neeta Varma', room: 'Room 201', status: 'Upcoming', color: '#EC4899', active: false },
      { id: 102, time: '10:15', ampm: 'AM', subject: 'Computer Sci.', teacher: 'Mr. Vikas Jain', room: 'IT Lab A', status: 'Upcoming', color: '#06B6D4', active: false },
      { id: 103, time: '11:30', ampm: 'AM', subject: 'Physical Ed.', teacher: 'Coach R. Singh', room: 'Sports Ground', status: 'Upcoming', color: '#10B981', active: false },
      { id: 104, time: '01:30', ampm: 'PM', subject: 'Visual Arts', teacher: 'Ms. Lily Das', room: 'Art Studio', status: 'Upcoming', color: '#F59E0B', active: false },
    ];

    const activeList = studentTimetableDay === 'Today' ? timetableToday : timetableTomorrow;

    return (
      <View style={styles.phoneFrame}>
        <ScrollView style={styles.screenScrollView} showsVerticalScrollIndicator={false} bounces={false}>
          {renderSubpageHeader("Today's Timetable")}

          <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
            {/* Day Selector Pills */}
            <View style={{ flexDirection: 'row', backgroundColor: '#E2E8F0', borderRadius: 24, padding: 4, marginBottom: 16 }}>
              {['Today', 'Tomorrow'].map((day) => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.loginRoleTab,
                    studentTimetableDay === day && styles.loginRoleTabActive,
                  ]}
                  onPress={() => setStudentTimetableDay(day)}
                >
                  <Text style={[styles.loginRoleTabText, studentTimetableDay === day && styles.loginRoleTabTextActive]}>
                    {day === 'Today' ? "Today (Wednesday)" : "Tomorrow (Thursday)"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Quick Status Summary Banner */}
            <View style={{ backgroundColor: '#EFF6FF', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: '#BFDBFE', flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <View style={[styles.studentPortalIconCircle, { backgroundColor: '#DBEAFE', width: 40, height: 40 }]}>
                <Ionicons name="time" size={22} color="#2563EB" />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{ fontSize: 13, fontWeight: '800', color: '#1E3A8A' }}>
                  {studentTimetableDay === 'Today' ? '4 Scheduled Classes' : '4 Classes Tomorrow'}
                </Text>
                <Text style={{ fontSize: 11, color: '#3B82F6', marginTop: 2 }}>
                  {studentTimetableDay === 'Today' ? 'Current Period: Mathematics (09:00 - 10:00 AM)' : 'First Class starts at 09:00 AM'}
                </Text>
              </View>
            </View>

            {/* Timetable Period Cards */}
            <Text style={styles.studentSectionHeaderTitle}>PERIOD-BY-PERIOD SCHEDULE</Text>
            <View style={{ marginTop: 8 }}>
              {activeList.map((slot) => (
                <View
                  key={slot.id}
                  style={[
                    styles.studentPortalBtnCard,
                    slot.active && { borderColor: '#2563EB', backgroundColor: '#F0F7FF' },
                    { marginBottom: 10, paddingVertical: 12 }
                  ]}
                >
                  <View style={{ alignItems: 'center', width: 62, paddingRight: 8, borderRightWidth: 1, borderRightColor: '#E2E8F0' }}>
                    <Text style={{ fontSize: 14, fontWeight: '800', color: slot.color }}>{slot.time}</Text>
                    <Text style={{ fontSize: 10, fontWeight: '600', color: '#64748B' }}>{slot.ampm}</Text>
                  </View>

                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ fontSize: 14, fontWeight: '800', color: '#0F172A' }}>{slot.subject}</Text>
                      {slot.active && (
                        <View style={{ backgroundColor: '#DBEAFE', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, marginLeft: 8 }}>
                          <Text style={{ fontSize: 9, fontWeight: '800', color: '#2563EB' }}>LIVE NOW</Text>
                        </View>
                      )}
                    </View>
                    <Text style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
                      {slot.teacher} • <Text style={{ fontWeight: '700', color: '#475569' }}>{slot.room}</Text>
                    </Text>
                  </View>

                  <View style={{ alignItems: 'flex-end' }}>
                    <View
                      style={{
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 8,
                        backgroundColor:
                          slot.status === 'Ongoing' ? '#DBEAFE' :
                          slot.status === 'Next' ? '#D1FAE5' : '#F1F5F9'
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '800',
                          color:
                            slot.status === 'Ongoing' ? '#2563EB' :
                            slot.status === 'Next' ? '#059669' : '#64748B'
                        }}
                      >
                        {slot.status}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Smart Notice */}
            <View style={{ backgroundColor: '#F8FAFC', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#E2E8F0', marginTop: 8, marginBottom: 24 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="information-circle-outline" size={18} color="#64748B" />
                <Text style={{ fontSize: 12, fontWeight: '700', color: '#334155', marginLeft: 6 }}>Recess & Lunch Break</Text>
              </View>
              <Text style={{ fontSize: 11, color: '#64748B', marginTop: 4, lineHeight: 16 }}>
                12:30 PM to 01:15 PM in Main Dining Hall. Library and Computer Lab remain open for quiet study.
              </Text>
            </View>
          </View>
        </ScrollView>
        {renderTabBar()}
      </View>
    );
  };

  // ==========================================
  // STUDENT PORTAL SCREEN 2: HOMEWORK CHECKLIST
  // ==========================================
  const renderStudentChecklistScreen = () => {
    const homeworkTasks = [
      { id: 'maths', key: 'maths', subject: 'Maths', color: '#2563EB', title: 'Quadratic Equations Exercise 4.2 (Q1 to Q10)', deadline: 'Due Tomorrow, 9 AM', priority: 'High' },
      { id: 'science', key: 'science', subject: 'Science', color: '#10B981', title: 'Draw & label Respiratory System diagram in record notebook', deadline: 'Due Friday, 11 AM', priority: 'Medium' },
      { id: 'english', key: 'english', subject: 'English', color: '#8B5CF6', title: 'Chapter 5 summary & character analysis of Sherlock Holmes', deadline: 'Completed Today', priority: 'Done' },
      { id: 'history', key: 'history', subject: 'History', color: '#F59E0B', title: 'Map pointing exercise: Major Indus Valley excavation sites', deadline: 'Due Next Monday', priority: 'Normal' },
    ];

    const completedCount = Object.values(homeworkDone).filter(Boolean).length;
    const totalCount = homeworkTasks.length;
    const percent = Math.round((completedCount / totalCount) * 100);

    const filteredTasks = homeworkTasks.filter((t) => {
      const isDone = homeworkDone[t.key];
      if (homeworkFilter === 'Pending') return !isDone;
      if (homeworkFilter === 'Completed') return isDone;
      return true;
    });

    return (
      <View style={styles.phoneFrame}>
        <ScrollView style={styles.screenScrollView} showsVerticalScrollIndicator={false} bounces={false}>
          {renderSubpageHeader('Homework Checklist')}

          <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
            {/* Progress Card */}
            <View style={{ backgroundColor: '#10B981', borderRadius: 18, padding: 16, shadowColor: '#10B981', shadowOpacity: 0.2, shadowRadius: 10, elevation: 4 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: '#ECFDF5' }}>TASK PROGRESS</Text>
                  <Text style={{ fontSize: 22, fontWeight: '900', color: '#FFFFFF', marginTop: 2 }}>{percent}% Completed</Text>
                </View>
                <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name="checkmark-done" size={26} color="#FFFFFF" />
                </View>
              </View>
              <Text style={{ fontSize: 12, color: '#D1FAE5', marginTop: 4 }}>
                {completedCount} of {totalCount} assignments marked complete
              </Text>
              <View style={{ height: 6, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 3, marginTop: 12, overflow: 'hidden' }}>
                <View style={{ height: '100%', width: `${percent}%`, backgroundColor: '#FFFFFF', borderRadius: 3 }} />
              </View>
            </View>

            {/* Filter Pills */}
            <View style={{ flexDirection: 'row', marginTop: 16, marginBottom: 8 }}>
              {['All', 'Pending', 'Completed'].map((flt) => (
                <TouchableOpacity
                  key={flt}
                  style={[
                    styles.studentMaterialsFilterPill,
                    homeworkFilter === flt && { backgroundColor: '#10B981' }
                  ]}
                  onPress={() => setHomeworkFilter(flt)}
                >
                  <Text style={[styles.studentMaterialsFilterText, homeworkFilter === flt && { color: '#FFFFFF', fontWeight: '800' }]}>
                    {flt} ({flt === 'All' ? totalCount : flt === 'Pending' ? totalCount - completedCount : completedCount})
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Interactive Tasks List */}
            <Text style={[styles.studentSectionHeaderTitle, { marginTop: 12, marginBottom: 8 }]}>ASSIGNMENTS LIST</Text>
            {filteredTasks.map((task) => {
              const isChecked = homeworkDone[task.key];
              return (
                <TouchableOpacity
                  key={task.id}
                  activeOpacity={0.8}
                  style={[
                    styles.studentPortalBtnCard,
                    isChecked && { opacity: 0.7, backgroundColor: '#F8FAFC' },
                    { marginBottom: 10 }
                  ]}
                  onPress={() => {
                    setHomeworkDone((prev) => ({
                      ...prev,
                      [task.key]: !prev[task.key],
                    }));
                  }}
                >
                  <View
                    style={[
                      styles.studentCheckboxSquare,
                      isChecked && styles.studentCheckboxSquareDone,
                      { marginRight: 12 }
                    ]}
                  >
                    {isChecked && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
                  </View>

                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={[styles.studentHomeworkSubject, { color: task.color }]}>{task.subject}</Text>
                      <Text style={[styles.studentHomeworkDeadline, { marginLeft: 8 }]}>• {task.deadline}</Text>
                    </View>
                    <Text style={[styles.studentHomeworkTitle, isChecked && styles.studentHomeworkTitleDone]}>
                      {task.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.loginSignInButton, { backgroundColor: '#10B981', marginTop: 10, marginBottom: 24 }]}
              onPress={() => showAlert('Homework Submitted', 'All checked assignments recorded with teacher portal.')}
            >
              <Text style={styles.signInButtonText}>Confirm & Save Progress</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {renderTabBar()}
      </View>
    );
  };

  // ==========================================
  // STUDENT PORTAL SCREEN 3: UPCOMING EXAMS
  // ==========================================
  const renderStudentExamsScreen = () => {
    const examsList = [
      {
        id: 1,
        title: 'Science Unit Test 2',
        date: '20 Oct 2026',
        time: '09:30 AM - 11:30 AM',
        room: 'Exam Hall 3 (Seat #B-14)',
        syllabus: 'Chapter 4 (Light & Optics) • Chapter 5 (Acids, Bases & Salts)',
        daysLeft: 6,
        pillBg: '#FEF3C7',
        pillColor: '#D97706',
      },
      {
        id: 2,
        title: 'Mathematics Term Evaluation',
        date: '24 Oct 2026',
        time: '09:30 AM - 12:00 PM',
        room: 'Exam Hall 1 (Seat #A-22)',
        syllabus: 'Quadratic Equations, Coordinate Geometry & Triangles',
        daysLeft: 10,
        pillBg: '#EFF6FF',
        pillColor: '#2563EB',
      },
      {
        id: 3,
        title: 'English Language & Comprehension',
        date: '28 Oct 2026',
        time: '10:00 AM - 12:00 PM',
        room: 'Exam Hall 2 (Seat #C-05)',
        syllabus: 'Reading Comprehension, Formal Letter Writing & Tenses',
        daysLeft: 14,
        pillBg: '#EEF2FF',
        pillColor: '#6366F1',
      },
    ];

    return (
      <View style={styles.phoneFrame}>
        <ScrollView style={styles.screenScrollView} showsVerticalScrollIndicator={false} bounces={false}>
          {renderSubpageHeader('Upcoming Exams')}

          <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
            {/* Countdown Banner */}
            <View style={{ backgroundColor: '#4F46E5', borderRadius: 18, padding: 18, shadowColor: '#4F46E5', shadowOpacity: 0.25, shadowRadius: 10, elevation: 4 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: '#C7D2FE', textTransform: 'uppercase' }}>NEXT EXAMINATION</Text>
                  <Text style={{ fontSize: 20, fontWeight: '900', color: '#FFFFFF', marginTop: 2 }}>Science Unit Test 2</Text>
                  <Text style={{ fontSize: 13, color: '#E0E7FF', marginTop: 4 }}>📅 Tuesday, 20 Oct 2026 • 09:30 AM</Text>
                </View>
                <View style={{ backgroundColor: '#FFFFFF', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 14, alignItems: 'center' }}>
                  <Text style={{ fontSize: 18, fontWeight: '900', color: '#4F46E5' }}>6</Text>
                  <Text style={{ fontSize: 10, fontWeight: '800', color: '#4F46E5' }}>DAYS</Text>
                </View>
              </View>
            </View>

            {/* Quick Hall Ticket Download Action */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#EEF2FF',
                borderRadius: 14,
                padding: 12,
                marginTop: 14,
                borderWidth: 1,
                borderColor: '#C7D2FE',
              }}
              onPress={() => showAlert('Hall Ticket Ready', 'Digital Hall Ticket #HT-6A-14 verified with QR Security Code.')}
            >
              <Ionicons name="card-outline" size={20} color="#4F46E5" style={{ marginRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: '#312E81' }}>Download Digital Hall Ticket</Text>
                <Text style={{ fontSize: 11, color: '#6366F1' }}>Seat #B-14 • Verified for October Exams</Text>
              </View>
              <Ionicons name="download-outline" size={18} color="#4F46E5" />
            </TouchableOpacity>

            {/* Detailed Exam Cards */}
            <Text style={[styles.studentSectionHeaderTitle, { marginTop: 18, marginBottom: 8 }]}>EXAMINATION SCHEDULE</Text>
            {examsList.map((exam) => (
              <View key={exam.id} style={styles.studentExamCard}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={styles.studentExamTitle}>{exam.title}</Text>
                  <View style={[styles.studentExamPill, { backgroundColor: exam.pillBg }]}>
                    <Text style={[styles.studentExamPillText, { color: exam.pillColor }]}>in {exam.daysLeft} days</Text>
                  </View>
                </View>
                <Text style={styles.studentExamSyllabus}>Syllabus: {exam.syllabus}</Text>
                <View style={styles.studentExamFooterRow}>
                  <Text style={styles.studentExamDate}>📅 {exam.date} • {exam.time}</Text>
                  <Text style={styles.studentExamHall}>📍 {exam.room}</Text>
                </View>
              </View>
            ))}

            {/* Exam Guidelines */}
            <View style={{ backgroundColor: '#F8FAFC', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#E2E8F0', marginTop: 8, marginBottom: 24 }}>
              <Text style={{ fontSize: 12, fontWeight: '700', color: '#1E293B' }}>Exam Hall Guidelines</Text>
              <Text style={{ fontSize: 11, color: '#64748B', marginTop: 4, lineHeight: 16 }}>
                • Students must be in school uniform with their ID card & hall ticket.{'\n'}
                • Transparent pencil pouch and non-programmable stationery only.{'\n'}
                • Report to designated exam hall 15 minutes before start time.
              </Text>
            </View>
          </View>
        </ScrollView>
        {renderTabBar()}
      </View>
    );
  };

  // ==========================================
  // STUDENT PORTAL SCREEN 4: LEARNING MATERIALS
  // ==========================================
  const renderStudentMaterialsScreen = () => {
    const materials = [
      { id: 1, title: 'Optics & Lens Formulas Revision Notes', type: 'Notes', format: 'PDF', size: '2.4 MB', subject: 'Science', color: '#16A34A', icon: 'document-text' },
      { id: 2, title: 'Maths Quadratic Equations Formulas Cheatsheet', type: 'PDFs', format: 'PDF', size: '1.8 MB', subject: 'Maths', color: '#2563EB', icon: 'book' },
      { id: 3, title: 'History Indus Valley Civilization Video Lecture', type: 'Videos', format: 'MP4', size: '48 MB', subject: 'History', color: '#D97706', icon: 'videocam' },
      { id: 4, title: 'English Formal Writing Templates & Vocab Guide', type: 'PDFs', format: 'PDF', size: '950 KB', subject: 'English', color: '#6366F1', icon: 'reader' },
      { id: 5, title: 'Physics Lab Experiments Manual & Safety Guide', type: 'Notes', format: 'PDF', size: '3.1 MB', subject: 'Science', color: '#16A34A', icon: 'flask' },
    ];

    const filteredMaterials = materials.filter((m) => {
      if (studentMaterialFilter === 'All') return true;
      return m.type === studentMaterialFilter;
    });

    return (
      <View style={styles.phoneFrame}>
        <ScrollView style={styles.screenScrollView} showsVerticalScrollIndicator={false} bounces={false}>
          {renderSubpageHeader('Learning Materials')}

          <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
            {/* Header Banner */}
            <View style={{ backgroundColor: '#16A34A', borderRadius: 18, padding: 18, shadowColor: '#16A34A', shadowOpacity: 0.2, shadowRadius: 10, elevation: 4 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: '#DCFCE7', textTransform: 'uppercase' }}>DIGITAL STUDY REPOSITORY</Text>
                  <Text style={{ fontSize: 20, fontWeight: '900', color: '#FFFFFF', marginTop: 2 }}>Class 6-A Library</Text>
                  <Text style={{ fontSize: 13, color: '#F0FDF4', marginTop: 4 }}>Teacher Verified Notes, Cheatsheets & Videos</Text>
                </View>
                <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name="library" size={24} color="#FFFFFF" />
                </View>
              </View>
            </View>

            {/* Filter Pills */}
            <View style={[styles.studentMaterialsFilterRow, { marginTop: 14, marginBottom: 8 }]}>
              {['All', 'Notes', 'PDFs', 'Videos'].map((flt) => (
                <TouchableOpacity
                  key={flt}
                  style={[
                    styles.studentMaterialsFilterPill,
                    studentMaterialFilter === flt && { backgroundColor: '#16A34A' }
                  ]}
                  onPress={() => setStudentMaterialFilter(flt)}
                >
                  <Text style={[styles.studentMaterialsFilterText, studentMaterialFilter === flt && styles.studentMaterialsFilterTextActive]}>
                    {flt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Materials List */}
            <Text style={[styles.studentSectionHeaderTitle, { marginTop: 12, marginBottom: 8 }]}>AVAILABLE DOWNLOADS</Text>
            {filteredMaterials.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.85}
                style={[styles.studentPortalBtnCard, { marginBottom: 10 }]}
                onPress={() => showAlert('Opening Material', `Downloading ${item.title} (${item.size}) for offline study.`)}
              >
                <View style={[styles.studentMaterialIconBox, { backgroundColor: item.color + '15' }]}>
                  <Ionicons name={item.icon} size={20} color={item.color} />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.studentMaterialTitle}>{item.title}</Text>
                  <Text style={styles.studentMaterialMeta}>
                    {item.subject} • {item.format} • {item.size}
                  </Text>
                </View>
                <View style={[styles.studentPortalArrowWrap, { backgroundColor: '#F0FDF4' }]}>
                  <Ionicons name="arrow-down-circle" size={20} color="#16A34A" />
                </View>
              </TouchableOpacity>
            ))}

            {/* Uploaded by Teachers Badge */}
            <View style={{ backgroundColor: '#F8FAFC', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#E2E8F0', marginTop: 8, marginBottom: 24, flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="cloud-done-outline" size={24} color="#16A34A" style={{ marginRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, fontWeight: '700', color: '#0F172A' }}>Offline Reading Enabled</Text>
                <Text style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
                  Downloaded files are automatically saved and accessible without mobile data.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        {renderTabBar()}
      </View>
    );
  };

  // ==========================================
  // STUDENT PORTAL SCREEN 5: RECENT MARKS & SCORES
  // ==========================================
  const renderStudentMarksScreen = () => {
    const marksData = [
      { id: 1, subject: 'Mathematics', exam: 'Unit Test 1', score: '95/100', grade: 'A+', badgeBg: '#10B981', percent: '95%' },
      { id: 2, subject: 'Science', exam: 'Lab Practical', score: '48/50', grade: 'A+', badgeBg: '#10B981', percent: '96%' },
      { id: 3, subject: 'English', exam: 'Grammar Quiz', score: '42/50', grade: 'A', badgeBg: '#2563EB', percent: '84%' },
      { id: 4, subject: 'Social Studies', exam: 'Mid-Term Paper', score: '88/100', grade: 'A', badgeBg: '#2563EB', percent: '88%' },
    ];

    return (
      <View style={styles.phoneFrame}>
        <ScrollView style={styles.screenScrollView} showsVerticalScrollIndicator={false} bounces={false}>
          {renderSubpageHeader('Recent Marks & Scores')}

          <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
            {/* GPA Summary Card */}
            <View style={{ backgroundColor: '#D97706', borderRadius: 18, padding: 18, shadowColor: '#D97706', shadowOpacity: 0.25, shadowRadius: 10, elevation: 4 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: '#FEF3C7', textTransform: 'uppercase' }}>CUMULATIVE EVALUATION</Text>
                  <Text style={{ fontSize: 26, fontWeight: '900', color: '#FFFFFF', marginTop: 2 }}>93.2%</Text>
                  <Text style={{ fontSize: 13, color: '#FFFBEB', marginTop: 4 }}>Rank: 3rd in Class 6-A • Grade A+</Text>
                </View>
                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name="trophy" size={28} color="#FFFFFF" />
                </View>
              </View>
            </View>

            {/* View Official Report Card Action */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFFBEB',
                borderRadius: 14,
                padding: 14,
                marginTop: 14,
                borderWidth: 1,
                borderColor: '#FDE68A',
              }}
              onPress={() => {
                setSelectedStudentForReport(masterStudentsList[0]);
                setCurrentScreen('report_card');
              }}
            >
              <Ionicons name="document-text-outline" size={22} color="#D97706" style={{ marginRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontWeight: '800', color: '#92400E' }}>View Term 1 Official Report Card</Text>
                <Text style={{ fontSize: 11, color: '#B45309' }}>With Teacher Remarks & Class Percentiles</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#D97706" />
            </TouchableOpacity>

            {/* Individual Subjects Breakdown */}
            <Text style={[styles.studentSectionHeaderTitle, { marginTop: 18, marginBottom: 8 }]}>EVALUATED TESTS</Text>
            {marksData.map((m) => (
              <View key={m.id} style={[styles.studentPortalBtnCard, { marginBottom: 10, paddingVertical: 12 }]}>
                <View style={[styles.studentGradeBadge, { backgroundColor: m.badgeBg, width: 38, height: 38, borderRadius: 19, marginRight: 12 }]}>
                  <Text style={[styles.studentGradeBadgeText, { fontSize: 13 }]}>{m.grade}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.studentMarksSubject}>{m.subject}</Text>
                  <Text style={styles.studentMarksExam}>{m.exam}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.studentMarksScore}>{m.score}</Text>
                  <Text style={{ fontSize: 11, fontWeight: '700', color: '#10B981', marginTop: 1 }}>{m.percent}</Text>
                </View>
              </View>
            ))}

            {/* Performance Insight */}
            <View style={{ backgroundColor: '#F8FAFC', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#E2E8F0', marginTop: 8, marginBottom: 24 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="trending-up" size={18} color="#10B981" />
                <Text style={{ fontSize: 12, fontWeight: '700', color: '#0F172A', marginLeft: 6 }}>Academic Trend: Exceptional</Text>
              </View>
              <Text style={{ fontSize: 11, color: '#64748B', marginTop: 4, lineHeight: 16 }}>
                Aarav's mathematics and lab performance has improved by +8% compared to the baseline assessment.
              </Text>
            </View>
          </View>
        </ScrollView>
        {renderTabBar()}
      </View>
    );
  };

  // ==========================================
  // SCREEN 3: ATTENDANCE & REPORT CARD
  // ==========================================
  const renderAttendanceScreen = () => {
    const weekData = [
      { day: 'Mon', date: '12 May', fillPercent: 100, isAbsent: false, isHoliday: false },
      { day: 'Tue', date: '13 May', fillPercent: 45, isAbsent: true, isHoliday: false },
      { day: 'Wed', date: '14 May', fillPercent: 100, isAbsent: false, isHoliday: false },
      { day: 'Thu', date: '15 May', fillPercent: 100, isAbsent: false, isHoliday: false },
      { day: 'Fri', date: '16 May', fillPercent: 100, isAbsent: false, isHoliday: false },
      { day: 'Sat', date: '17 May', fillPercent: 100, isAbsent: false, isHoliday: true },
    ];

    return (
      <View style={styles.phoneFrame}>
        <ScrollView
          style={styles.screenScrollView}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {renderSubpageHeader('Attendance')}

          {/* Overlapping Pill Card */}
          <View style={styles.overlappingCardWrap}>
            <View style={styles.todayAttendancePill}>
              <View>
                <Text style={styles.todayAttendanceTitle}>
                  Today's Attendance — <Text style={{ color: '#10B981', fontWeight: '700' }}>Present</Text>
                </Text>
                <Text style={styles.todayAttendanceBigTime}>8:45 AM</Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.greenCheckmarkCircle}
                onPress={() => showAlert('Attendance Verified', 'Punched via RFID card at Main Gate at 8:45:12 AM.')}
              >
                <Ionicons name="checkmark" size={26} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Body Section */}
          <View style={styles.subpageBodyContainer}>
            {/* Quick Action Button: Apply Leave */}
            <TouchableOpacity
              style={styles.actionBannerBtn}
              activeOpacity={0.85}
              onPress={() => setLeaveModalVisible(true)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="calendar-outline" size={20} color="#2563EB" style={{ marginRight: 10 }} />
                <Text style={styles.actionBannerText}>Apply Student Leave / Absence</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#2563EB" />
            </TouchableOpacity>

            {/* Weekly Bar Chart */}
            <View style={styles.attendanceChartCard}>
              <View style={styles.chartHeaderRow}>
                <Text style={styles.chartTitleText}>This Week</Text>
                <Text style={styles.chartMaxLabel}>100%</Text>
              </View>

              <View style={styles.barsFlexRow}>
                {weekData.map((item, index) => {
                  let barColor = '#10B981';
                  if (item.isHoliday) barColor = '#E2E8F0';

                  return (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.8}
                      onPress={() =>
                        showAlert(
                          `${item.day}, ${item.date}`,
                          item.isHoliday
                            ? 'Status: Scheduled School Holiday'
                            : item.isAbsent
                            ? 'Status: Absent (Half Day Leave)'
                            : 'Status: Present (Marked at 8:45 AM)'
                        )
                      }
                      style={styles.singleBarColumn}
                    >
                      <View style={styles.barOuterTrack}>
                        <View
                          style={[
                            styles.barInnerFill,
                            {
                              height: `${item.fillPercent}%`,
                              backgroundColor: barColor,
                            },
                          ]}
                        />
                      </View>
                      <Text style={styles.barDayLabel}>{item.day}</Text>
                      <Text style={styles.barDateLabel}>{item.date}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.chartLegendRow}>
                <View style={styles.legendItemWrap}>
                  <View style={[styles.legendPill, { backgroundColor: '#10B981' }]} />
                  <Text style={styles.legendLabel}>Present (5)</Text>
                </View>
                <View style={styles.legendItemWrap}>
                  <View style={[styles.legendPill, { backgroundColor: '#EF4444' }]} />
                  <Text style={styles.legendLabel}>Absent (0)</Text>
                </View>
                <View style={styles.legendItemWrap}>
                  <View style={[styles.legendPill, { backgroundColor: '#CBD5E1' }]} />
                  <Text style={styles.legendLabel}>Holiday (1)</Text>
                </View>
                <Text style={styles.legendRightPercent}>0%</Text>
              </View>
            </View>

            {/* Latest Result */}
            <View style={styles.latestResultCard}>
              <Text style={styles.latestResultHeader}>Latest Result</Text>

              <View style={styles.resultDetailsRow}>
                <View style={styles.trophyIconCircle}>
                  <Ionicons name="trophy" size={22} color="#4F46E5" />
                </View>
                <View style={styles.resultSubjectWrap}>
                  <Text style={styles.resultSubjectName}>Unit Test – Math</Text>
                  <Text style={styles.resultDateText}>12 May 2025</Text>
                </View>
                <View style={styles.resultGradeWrap}>
                  <Text style={styles.resultScoreText}>85%</Text>
                  <Text style={styles.resultGradeText}>Grade A</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.reportCardRow}
                onPress={() => setReportCardModalVisible(true)}
              >
                <Text style={styles.reportCardLinkText}>View Report Card</Text>
                <Ionicons name="chevron-forward" size={16} color="#64748B" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {renderTabBar()}
      </View>
    );
  };

  // ==========================================
  // SCREEN 4: FULL FEES MANAGEMENT & GRAPH SCREEN
  // ==========================================
  const renderFeesScreen = () => {
    const termsData = [
      { term: 'Term 1', amount: '₹12,000', paid: true, percent: 100 },
      { term: 'Term 2', amount: isFeePaid ? '₹0' : '₹4,500', paid: isFeePaid, percent: isFeePaid ? 100 : 35 },
      { term: 'Term 3', amount: '₹12,000', paid: false, percent: 0 },
      { term: 'Term 4', amount: '₹12,000', paid: false, percent: 0 },
    ];

    const handleExecutePayment = () => {
      setIsProcessingPayment(true);
      setTimeout(() => {
        setIsProcessingPayment(false);
        setIsFeePaid(true);
        showAlert('Payment Success! 🎉', 'Transaction ID: #TXN-9843210\nAmount: ₹4,500 paid successfully. Receipt generated.');
      }, 1200);
    };

    return (
      <View style={styles.phoneFrame}>
        <ScrollView
          style={styles.screenScrollView}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {renderSubpageHeader('Fees Details')}

          {/* Overlapping Top Card */}
          <View style={styles.overlappingCardWrap}>
            <View style={styles.todayAttendancePill}>
              <View>
                <Text style={styles.todayAttendanceTitle}>
                  Outstanding Due —{' '}
                  <Text style={{ color: isFeePaid ? '#10B981' : '#D97706', fontWeight: '700' }}>
                    {isFeePaid ? 'Cleared' : 'Pending'}
                  </Text>
                </Text>
                <Text style={[styles.todayAttendanceBigTime, { color: isFeePaid ? '#10B981' : '#D97706' }]}>
                  {isFeePaid ? '₹0' : '₹4,500'}
                </Text>
              </View>
              <View style={[styles.greenCheckmarkCircle, { backgroundColor: isFeePaid ? '#10B981' : '#F59E0B' }]}>
                {isFeePaid ? (
                  <Ionicons name="checkmark" size={26} color="#FFFFFF" />
                ) : (
                  <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: '800' }}>₹</Text>
                )}
              </View>
            </View>
          </View>

          <View style={styles.subpageBodyContainer}>
            {/* View Receipt / Download Statement Button */}
            <TouchableOpacity
              style={styles.actionBannerBtn}
              activeOpacity={0.85}
              onPress={() => setFeeReceiptModalVisible(true)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="receipt-outline" size={20} color="#2563EB" style={{ marginRight: 10 }} />
                <Text style={styles.actionBannerText}>View & Download Fee Receipt</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#2563EB" />
            </TouchableOpacity>

            {/* Annual Fee Payment Bar Graph */}
            <View style={styles.attendanceChartCard}>
              <View style={styles.chartHeaderRow}>
                <Text style={styles.chartTitleText}>Annual Fee Progress</Text>
                <Text style={styles.chartMaxLabel}>₹40,500 Total</Text>
              </View>

              <View style={styles.barsFlexRow}>
                {termsData.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    style={styles.singleBarColumn}
                    onPress={() =>
                      showAlert(
                        `${item.term} Summary`,
                        item.paid
                          ? `All dues cleared! (${item.amount})`
                          : `Status: Outstanding balance of ${item.amount}`
                      )
                    }
                  >
                    <View style={styles.barOuterTrack}>
                      <View
                        style={[
                          styles.barInnerFill,
                          {
                            height: `${item.percent}%`,
                            backgroundColor: item.paid ? '#10B981' : item.percent > 0 ? '#F59E0B' : '#CBD5E1',
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.barDayLabel}>{item.term}</Text>
                    <Text style={styles.barDateLabel}>{item.amount}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.chartLegendRow}>
                <View style={styles.legendItemWrap}>
                  <View style={[styles.legendPill, { backgroundColor: '#10B981' }]} />
                  <Text style={styles.legendLabel}>Paid ({isFeePaid ? '₹16,500' : '₹12,000'})</Text>
                </View>
                <View style={styles.legendItemWrap}>
                  <View style={[styles.legendPill, { backgroundColor: '#F59E0B' }]} />
                  <Text style={styles.legendLabel}>Due ({isFeePaid ? '₹0' : '₹4,500'})</Text>
                </View>
                <View style={styles.legendItemWrap}>
                  <View style={[styles.legendPill, { backgroundColor: '#CBD5E1' }]} />
                  <Text style={styles.legendLabel}>Upcoming</Text>
                </View>
              </View>
            </View>

            {/* Fee Breakdown Card */}
            <View style={styles.latestResultCard}>
              <Text style={styles.latestResultHeader}>Term 2 Invoice Breakdown</Text>

              <View style={styles.feeBreakdownRow}>
                <Text style={styles.feeBreakdownLabel}>Tuition Fee (Q2)</Text>
                <Text style={styles.feeBreakdownValue}>₹3,200</Text>
              </View>
              <View style={styles.feeBreakdownRow}>
                <Text style={styles.feeBreakdownLabel}>Computer & Science Lab</Text>
                <Text style={styles.feeBreakdownValue}>₹800</Text>
              </View>
              <View style={styles.feeBreakdownRow}>
                <Text style={styles.feeBreakdownLabel}>Bus Transport (Route 12)</Text>
                <Text style={styles.feeBreakdownValue}>₹500</Text>
              </View>
              <View style={[styles.feeBreakdownRow, { borderBottomWidth: 0, paddingTop: 10 }]}>
                <Text style={[styles.feeBreakdownLabel, { fontWeight: '700', color: '#0F172A' }]}>
                  {isFeePaid ? 'Total Paid' : 'Total Due'}
                </Text>
                <Text
                  style={[
                    styles.feeBreakdownValue,
                    { fontWeight: '800', color: isFeePaid ? '#10B981' : '#D97706', fontSize: 16 },
                  ]}
                >
                  {isFeePaid ? '₹0 (Paid)' : '₹4,500'}
                </Text>
              </View>

              {!isFeePaid ? (
                <TouchableOpacity
                  style={[styles.loginSignInButton, { marginTop: 14, backgroundColor: '#10B981' }]}
                  onPress={handleExecutePayment}
                  disabled={isProcessingPayment}
                >
                  {isProcessingPayment ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <Text style={styles.signInButtonText}>Pay Now ₹4,500</Text>
                  )}
                </TouchableOpacity>
              ) : (
                <View style={styles.feePaidConfirmBox}>
                  <Ionicons name="checkmark-circle" size={20} color="#10B981" style={{ marginRight: 6 }} />
                  <Text style={styles.feePaidConfirmText}>Term 2 Dues Fully Cleared</Text>
                </View>
              )}
            </View>

            {/* Payment History Log */}
            <View style={[styles.latestResultCard, { marginTop: 14, marginBottom: 24 }]}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <Text style={styles.latestResultHeader}>Recent Payment History</Text>
                <TouchableOpacity onPress={() => setFeeReceiptModalVisible(true)}>
                  <Text style={{ fontSize: 11, fontWeight: '700', color: '#2563EB' }}>Download All</Text>
                </TouchableOpacity>
              </View>

              {[
                { txn: 'TXN-901', term: 'Term 1 Tuition & Annual', amt: '₹12,000', date: '15 Apr 2026', mode: 'UPI (GPay)', status: 'Success' },
                { txn: 'TXN-908', term: 'Term 2 Tuition & Labs', amt: isFeePaid ? '₹4,500' : '₹12,000', date: isFeePaid ? 'Today, Just now' : '12 Jul 2026', mode: 'NetBanking', status: 'Success' },
              ].map((tx, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 10,
                    borderBottomWidth: idx === 0 ? 1 : 0,
                    borderBottomColor: '#F1F5F9',
                  }}
                  onPress={() => {
                    setSelectedReceiptTxn({
                      receiptNo: 'REC-2026-9041',
                      txnId: tx.txn,
                      studentName: 'Aarav Sharma',
                      admissionNo: 'ADM-2024-001',
                      grade: 'Grade 6-A',
                      term: tx.term,
                      amount: tx.amt === '₹12,000' ? 12000 : 4500,
                      date: tx.date,
                      mode: tx.mode,
                      status: tx.status,
                      pendingBalance: isFeePaid ? 0 : 4500,
                      totalFee: 40500,
                    });
                    setReceiptDetailModalVisible(true);
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: '#ECFDF5', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                      <Ionicons name="checkmark-done" size={18} color="#10B981" />
                    </View>
                    <View>
                      <Text style={{ fontSize: 13, fontWeight: '700', color: '#0F172A' }}>{tx.term}</Text>
                      <Text style={{ fontSize: 11, color: '#64748B', marginTop: 1 }}>{tx.txn} • {tx.mode}</Text>
                      <Text style={{ fontSize: 10, color: '#94A3B8' }}>{tx.date}</Text>
                    </View>
                  </View>

                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 13, fontWeight: '800', color: '#0F172A' }}>{tx.amt}</Text>
                    <View style={{ backgroundColor: '#ECFDF5', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, marginTop: 3 }}>
                      <Text style={{ fontSize: 10, fontWeight: '800', color: '#059669' }}>● {tx.status}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        {renderTabBar()}
      </View>
    );
  };

  // ==========================================
  // SCREEN 5: FULL HOMEWORK & COMPLETION GRAPH
  // ==========================================
  const renderHomeworkScreen = () => {
    const subjectProgress = [
      { subject: 'Math', total: 6, done: homeworkDone.maths ? 6 : 5, percent: homeworkDone.maths ? 100 : 83 },
      { subject: 'Sci', total: 5, done: homeworkDone.science ? 5 : 4, percent: homeworkDone.science ? 100 : 80 },
      { subject: 'Eng', total: 4, done: homeworkDone.english ? 4 : 3, percent: homeworkDone.english ? 100 : 75 },
      { subject: 'Soc', total: 4, done: 4, percent: 100 },
      { subject: 'Hindi', total: 3, done: 3, percent: 100 },
    ];

    const pendingCount = (!homeworkDone.maths ? 1 : 0) + (!homeworkDone.science ? 1 : 0) + (!homeworkDone.english ? 1 : 0);

    return (
      <View style={styles.phoneFrame}>
        <ScrollView
          style={styles.screenScrollView}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {renderSubpageHeader('Homework')}

          {/* Overlapping Top Card */}
          <View style={styles.overlappingCardWrap}>
            <View style={styles.todayAttendancePill}>
              <View>
                <Text style={styles.todayAttendanceTitle}>
                  Pending Tasks —{' '}
                  <Text style={{ color: pendingCount === 0 ? '#10B981' : '#2563EB', fontWeight: '700' }}>
                    {pendingCount === 0 ? 'All Completed' : `${pendingCount} Due`}
                  </Text>
                </Text>
                <Text
                  style={[
                    styles.todayAttendanceBigTime,
                    { color: pendingCount === 0 ? '#10B981' : '#2563EB' },
                  ]}
                >
                  {pendingCount === 0 ? 'All Clear 🎉' : `${pendingCount} Tasks`}
                </Text>
              </View>
              <View style={[styles.greenCheckmarkCircle, { backgroundColor: '#3B82F6' }]}>
                <Ionicons name="book" size={24} color="#FFFFFF" />
              </View>
            </View>
          </View>

          <View style={styles.subpageBodyContainer}>
            {/* Filter Tabs: All | Pending | Completed */}
            <View style={styles.filterTabsRow}>
              {['All', 'Pending', 'Completed'].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[styles.filterTabBtn, homeworkFilter === tab && styles.filterTabBtnActive]}
                  onPress={() => setHomeworkFilter(tab)}
                >
                  <Text style={[styles.filterTabText, homeworkFilter === tab && styles.filterTabTextActive]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Subject-Wise Completion Graph */}
            <View style={styles.attendanceChartCard}>
              <View style={styles.chartHeaderRow}>
                <Text style={styles.chartTitleText}>Subject Completion</Text>
                <Text style={styles.chartMaxLabel}>Tap bar for details</Text>
              </View>

              <View style={styles.barsFlexRow}>
                {subjectProgress.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    style={styles.singleBarColumn}
                    onPress={() =>
                      showAlert(
                        `${item.subject} Homework`,
                        `${item.done} of ${item.total} assignments completed (${item.percent}%).`
                      )
                    }
                  >
                    <View style={styles.barOuterTrack}>
                      <View
                        style={[
                          styles.barInnerFill,
                          {
                            height: `${item.percent}%`,
                            backgroundColor: item.percent === 100 ? '#10B981' : '#3B82F6',
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.barDayLabel}>{item.subject}</Text>
                    <Text style={styles.barDateLabel}>{item.done}/{item.total}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.chartLegendRow}>
                <View style={styles.legendItemWrap}>
                  <View style={[styles.legendPill, { backgroundColor: '#10B981' }]} />
                  <Text style={styles.legendLabel}>100% Done</Text>
                </View>
                <View style={styles.legendItemWrap}>
                  <View style={[styles.legendPill, { backgroundColor: '#3B82F6' }]} />
                  <Text style={styles.legendLabel}>In Progress</Text>
                </View>
              </View>
            </View>

            {/* Interactive Assignments List */}
            <View style={styles.latestResultCard}>
              <Text style={styles.latestResultHeader}>Tap to check off tasks</Text>

              {/* Task 1: Maths */}
              {(homeworkFilter === 'All' ||
                (homeworkFilter === 'Pending' && !homeworkDone.maths) ||
                (homeworkFilter === 'Completed' && homeworkDone.maths)) && (
                <TouchableOpacity
                  style={styles.homeworkCheckRow}
                  activeOpacity={0.7}
                  onPress={() => setHomeworkDone((prev) => ({ ...prev, maths: !prev.maths }))}
                >
                  <Ionicons
                    name={homeworkDone.maths ? 'checkbox' : 'square-outline'}
                    size={24}
                    color={homeworkDone.maths ? '#10B981' : '#94A3B8'}
                    style={{ marginRight: 12 }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.homeworkTitle, homeworkDone.maths && styles.taskDoneText]}>
                      Maths Chapter 5
                    </Text>
                    <Text style={styles.homeworkSubtitle}>Exercises 5.1 & 5.2 • Due Friday</Text>
                  </View>
                  <Text style={styles.homeworkBadge}>High</Text>
                </TouchableOpacity>
              )}

              {/* Task 2: Science */}
              {(homeworkFilter === 'All' ||
                (homeworkFilter === 'Pending' && !homeworkDone.science) ||
                (homeworkFilter === 'Completed' && homeworkDone.science)) && (
                <TouchableOpacity
                  style={styles.homeworkCheckRow}
                  activeOpacity={0.7}
                  onPress={() => setHomeworkDone((prev) => ({ ...prev, science: !prev.science }))}
                >
                  <Ionicons
                    name={homeworkDone.science ? 'checkbox' : 'square-outline'}
                    size={24}
                    color={homeworkDone.science ? '#10B981' : '#94A3B8'}
                    style={{ marginRight: 12 }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.homeworkTitle, homeworkDone.science && styles.taskDoneText]}>
                      Science Observation
                    </Text>
                    <Text style={styles.homeworkSubtitle}>Plant leaf diagram • Due Monday</Text>
                  </View>
                  <Text style={[styles.homeworkBadge, { backgroundColor: '#FEF3C7', color: '#D97706' }]}>Med</Text>
                </TouchableOpacity>
              )}

              {/* Task 3: English */}
              {(homeworkFilter === 'All' ||
                (homeworkFilter === 'Pending' && !homeworkDone.english) ||
                (homeworkFilter === 'Completed' && homeworkDone.english)) && (
                <TouchableOpacity
                  style={[styles.homeworkCheckRow, { borderBottomWidth: 0 }]}
                  activeOpacity={0.7}
                  onPress={() => setHomeworkDone((prev) => ({ ...prev, english: !prev.english }))}
                >
                  <Ionicons
                    name={homeworkDone.english ? 'checkbox' : 'square-outline'}
                    size={24}
                    color={homeworkDone.english ? '#10B981' : '#94A3B8'}
                    style={{ marginRight: 12 }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.homeworkTitle, homeworkDone.english && styles.taskDoneText]}>
                      English Poem Reading
                    </Text>
                    <Text style={styles.homeworkSubtitle}>Read 'The Brook' • Due Tomorrow</Text>
                  </View>
                  <Text style={[styles.homeworkBadge, { backgroundColor: '#E0F2FE', color: '#0284C7' }]}>Normal</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>

        {renderTabBar()}
      </View>
    );
  };

  // ==========================================
  // SCREEN 6: FULL BUS LIVE TRACKING & ROUTE GRAPH
  // ==========================================
  const renderBusScreen = () => {
    const stopsData = [
      { stop: 'School Gate', time: '3:00 PM', done: true },
      { stop: 'Oak Avenue', time: '3:15 PM', done: true },
      { stop: 'City Center', time: '3:30 PM', done: true },
      { stop: 'Your Stop (Stop 4)', time: '3:45 PM', done: false, isCurrent: true },
      { stop: 'Park Residency', time: '4:00 PM', done: false },
    ];

    const handleRefreshGPS = () => {
      setIsLocatingBus(true);
      setTimeout(() => {
        setIsLocatingBus(false);
        setLastBusUpdate('Just now');
        showAlert('GPS Updated', 'Bus No. 12 coordinates refreshed. Current Speed: 34 km/h.');
      }, 800);
    };

    return (
      <View style={styles.phoneFrame}>
        <ScrollView
          style={styles.screenScrollView}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {renderSubpageHeader('Bus Live Tracking')}

          {/* Overlapping Top Card */}
          <View style={styles.overlappingCardWrap}>
            <View style={styles.todayAttendancePill}>
              <View>
                <Text style={styles.todayAttendanceTitle}>
                  Bus No. 12 — <Text style={{ color: '#10B981', fontWeight: '700' }}>Live on Route</Text>
                </Text>
                <Text style={[styles.todayAttendanceBigTime, { color: '#10B981' }]}>6 mins away</Text>
              </View>
              <View style={[styles.greenCheckmarkCircle, { backgroundColor: '#10B981' }]}>
                <Ionicons name="bus" size={24} color="#FFFFFF" />
              </View>
            </View>
          </View>

          <View style={styles.subpageBodyContainer}>
            {/* Quick Action Button: View Full Interactive GPS Map */}
            <TouchableOpacity
              style={styles.actionBannerBtn}
              activeOpacity={0.85}
              onPress={() => setLiveMapModalVisible(true)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="map-outline" size={20} color="#2563EB" style={{ marginRight: 10 }} />
                <Text style={styles.actionBannerText}>Open Real-Time GPS Live Map</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#2563EB" />
            </TouchableOpacity>

            {/* Live GPS Route Progression */}
            <View style={styles.attendanceChartCard}>
              <View style={styles.chartHeaderRow}>
                <Text style={styles.chartTitleText}>Route Timeline</Text>
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={handleRefreshGPS}
                >
                  {isLocatingBus ? (
                    <ActivityIndicator size="small" color="#2563EB" />
                  ) : (
                    <>
                      <Ionicons name="refresh" size={14} color="#2563EB" style={{ marginRight: 4 }} />
                      <Text style={{ fontSize: 11, color: '#2563EB', fontWeight: '600' }}>Refresh</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>

              {/* Graphical Stop Timeline */}
              <View style={{ marginTop: 12 }}>
                {stopsData.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.7}
                    onPress={() =>
                      showAlert(
                        item.stop,
                        item.done
                          ? `Bus successfully passed this stop at ${item.time}.`
                          : item.isCurrent
                          ? `Bus is approaching this stop. ETA: 6 mins (${item.time}).`
                          : `Scheduled stop time: ${item.time}.`
                      )
                    }
                    style={styles.stopTimelineRow}
                  >
                    <View style={styles.timelineIndicatorColumn}>
                      <View
                        style={[
                          styles.timelineDot,
                          item.done
                            ? { backgroundColor: '#10B981' }
                            : item.isCurrent
                            ? { backgroundColor: '#2563EB', borderWidth: 3, borderColor: '#BFDBFE' }
                            : { backgroundColor: '#CBD5E1' },
                        ]}
                      />
                      {index < stopsData.length - 1 && (
                        <View
                          style={[
                            styles.timelineLine,
                            item.done ? { backgroundColor: '#10B981' } : { backgroundColor: '#E2E8F0' },
                          ]}
                        />
                      )}
                    </View>
                    <View style={styles.timelineTextWrap}>
                      <Text
                        style={[
                          styles.stopNameText,
                          item.isCurrent && { color: '#2563EB', fontWeight: '700' },
                        ]}
                      >
                        {item.stop}
                        {item.isCurrent && ' (Approaching)'}
                      </Text>
                      <Text style={styles.stopTimeText}>Estimated: {item.time}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Driver & Bus Info */}
            <View style={styles.latestResultCard}>
              <Text style={styles.latestResultHeader}>Vehicle & Driver Details</Text>

              <View style={styles.resultDetailsRow}>
                <View style={[styles.trophyIconCircle, { backgroundColor: '#ECFDF5' }]}>
                  <Ionicons name="person" size={22} color="#059669" />
                </View>
                <View style={styles.resultSubjectWrap}>
                  <Text style={styles.resultSubjectName}>Ramesh Kumar (Driver)</Text>
                  <Text style={styles.resultDateText}>Verified School Staff • 8 yrs exp</Text>
                </View>
                <TouchableOpacity
                  style={styles.callDriverBtn}
                  onPress={() => setCallModalVisible(true)}
                >
                  <Ionicons name="call" size={18} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              <View style={[styles.feeBreakdownRow, { borderBottomWidth: 0, paddingTop: 10 }]}>
                <Text style={styles.feeBreakdownLabel}>Vehicle Reg No.</Text>
                <Text style={[styles.feeBreakdownValue, { fontWeight: '700' }]}>MH-12-AB-3421</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {renderTabBar()}
      </View>
    );
  };

  // ==========================================
  // SCREEN 7: SMART DIARY (SCHEDULE, LESSON DETAIL, GRADES)
  // ==========================================
  const renderSmartDiaryScreen = () => {
    // Calendar days for Schedule header
    const calendarDays = [
      { dayName: 'SUN', dayNum: 10 },
      { dayName: 'MON', dayNum: 11 },
      { dayName: 'TUE', dayNum: 12 },
      { dayName: 'WED', dayNum: 13 },
      { dayName: 'THU', dayNum: 14 },
      { dayName: 'FRI', dayNum: 15 },
      { dayName: 'SAT', dayNum: 16 },
    ];

    // Schedule items matching user's design
    const scheduleItems = [
      {
        id: 'physics',
        subject: 'Physics',
        time: '8:30–9:15',
        badge: null,
        badgeColor: null,
        teacher: 'Dr. Robert Allen',
        topic: 'Thermodynamics & Heat Transfer',
        homeworkText: 'Read Chapter 4, solve numerical exercises 1-5.',
        homeworkBadge: '10',
      },
      {
        id: 'maths',
        subject: 'Mathematics',
        time: '9:25–10:10',
        badge: '11',
        badgeColor: '#1E293B',
        teacher: 'Mrs. Sarah Jenkins',
        topic: 'Algebraic Equations & Matrices',
        homeworkText: 'Complete exercise 7.2 on page 142.',
        homeworkBadge: '11',
      },
      {
        id: 'geography',
        subject: 'Geography',
        time: '10:20–11:05',
        badge: 'dot',
        badgeColor: '#EF4444',
        teacher: 'Mr. David Clark',
        topic: 'Plate Tectonics & Continental Drift',
        homeworkText: 'Map labeling of major fault lines.',
        homeworkBadge: 'Due',
      },
      {
        id: 'english',
        subject: 'English',
        time: '11:35–12:20',
        badge: '9',
        badgeColor: '#1E293B',
        teacher: 'Ms. Elizabeth Stone',
        topic: 'Shakespearean Sonnets & Analysis',
        homeworkText: 'Write a critical review of Sonnet 18.',
        homeworkBadge: '9',
      },
      {
        id: 'worldlit',
        subject: 'World Literature',
        time: '12:30–13:15',
        badge: '11',
        badgeColor: '#1E293B',
        teacher: 'William Dunkan',
        topic: 'Franz Kafka\'s "The Metamorphozis"',
        homeworkText: 'Read Kafka\'s "The Metamorphozis". Write detailed literature charachteristics of Gregor Samsa.',
        homeworkBadge: '11',
      },
    ];

    // Out-of-class item at bottom
    const outOfClassItem = {
      subject: 'Biology',
      tag: 'Out-of-class',
      time: '13:25–14:10',
    };

    // Grades items matching user's 3rd screenshot
    const gradesList = [
      { subject: 'Mathematics', score: '10' },
      { subject: 'English', score: '11' },
      { subject: 'English Literature', score: '9' },
      { subject: 'Chemistry', score: '11' },
      { subject: 'Physics', score: '8' },
      { subject: 'French', score: '11' },
      { subject: 'Astronomy', score: '7' },
      { subject: 'Biology', score: '10' },
      { subject: 'World History', score: '12' },
      { subject: 'Ecology', score: '9' },
      { subject: 'Fine Arts', score: '10' },
      { subject: 'World Literature', score: '12' },
    ];

    // Active lesson for Detail View
    const activeLesson = selectedScheduleLesson || scheduleItems.find((s) => s.id === 'worldlit');

    // Bottom Navigation for Diary (Schedule | Grades | Notifications | Settings)
    const renderDiaryBottomNav = () => (
      <View style={styles.diaryBottomNavBar}>
        <TouchableOpacity
          style={styles.diaryNavTab}
          onPress={() => {
            setSelectedScheduleLesson(null);
            setDiarySubTab('Schedule');
          }}
        >
          <Ionicons
            name="calendar"
            size={22}
            color={diarySubTab === 'Schedule' ? '#2B57B2' : '#8E9EC5'}
          />
          <Text
            style={[
              styles.diaryNavLabel,
              diarySubTab === 'Schedule' && styles.diaryNavLabelActive,
            ]}
          >
            Schedule
          </Text>
          {diarySubTab === 'Schedule' && <View style={styles.diaryNavUnderline} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.diaryNavTab}
          onPress={() => {
            setSelectedScheduleLesson(null);
            setDiarySubTab('Grades');
          }}
        >
          <Ionicons
            name="star"
            size={22}
            color={diarySubTab === 'Grades' ? '#2B57B2' : '#8E9EC5'}
          />
          <Text
            style={[
              styles.diaryNavLabel,
              diarySubTab === 'Grades' && styles.diaryNavLabelActive,
            ]}
          >
            Grades
          </Text>
          {diarySubTab === 'Grades' && <View style={styles.diaryNavUnderline} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.diaryNavTab}
          onPress={() => {
            setCurrentScreen('notifications');
            setActiveTab('Notifications');
          }}
        >
          <Ionicons
            name="notifications"
            size={22}
            color={diarySubTab === 'Notifications' ? '#2B57B2' : '#8E9EC5'}
          />
          <Text
            style={[
              styles.diaryNavLabel,
              diarySubTab === 'Notifications' && styles.diaryNavLabelActive,
            ]}
          >
            Notifications
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.diaryNavTab}
          onPress={() => {
            setCurrentScreen('settings');
            setActiveTab('Settings');
          }}
        >
          <Ionicons
            name="settings"
            size={22}
            color={diarySubTab === 'Settings' ? '#2B57B2' : '#8E9EC5'}
          />
          <Text
            style={[
              styles.diaryNavLabel,
              diarySubTab === 'Settings' && styles.diaryNavLabelActive,
            ]}
          >
            Settings
          </Text>
        </TouchableOpacity>
      </View>
    );

    // ==========================================
    // VIEW B: LESSON DETAIL SCREEN (Middle Image)
    // ==========================================
    if (selectedScheduleLesson !== null) {
      return (
        <View style={[styles.phoneFrame, { backgroundColor: '#8CA7F3' }]}>
          <SafeAreaView style={{ flex: 1 }}>
            {/* Top Back Nav & Header */}
            <View style={styles.diaryDetailTopBar}>
              <TouchableOpacity
                style={styles.diaryBackChevronBtn}
                onPress={() => setSelectedScheduleLesson(null)}
              >
                <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.diaryTopAvatarWrap}
                onPress={() => setProfileModalVisible(true)}
              >
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80' }}
                  style={styles.diaryTopAvatar}
                />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 36 }}
              showsVerticalScrollIndicator={false}
            >
              {/* Title & Grade Badge */}
              <View style={styles.diaryDetailHeaderRow}>
                <Text style={styles.diaryDetailTitle}>{activeLesson.subject}</Text>
                <View style={styles.diaryGradeCircleBig}>
                  <Text style={styles.diaryGradeCircleBigText}>{activeLesson.badge || '11'}</Text>
                </View>
              </View>

              {/* Topic subtitle */}
              <Text style={styles.diaryTopicSubtitle}>{activeLesson.topic}</Text>

              {/* Time block */}
              <View style={styles.diaryMetaBlock}>
                <Text style={styles.diaryMetaValue}>{activeLesson.time}</Text>
                <Text style={styles.diaryMetaLabel}>Time</Text>
              </View>

              {/* Teacher block */}
              <View style={styles.diaryMetaBlock}>
                <Text style={styles.diaryMetaValue}>{activeLesson.teacher}</Text>
                <Text style={styles.diaryMetaLabel}>Teacher</Text>
              </View>

              {/* HOMEWORK Section */}
              <Text style={styles.diarySectionCapTitle}>HOMEWORK</Text>
              <View style={styles.diaryHomeworkCard}>
                <Text style={styles.diaryHomeworkText}>
                  {activeLesson.homeworkText}
                </Text>
                <View style={styles.diaryGradeCircleSmall}>
                  <Text style={styles.diaryGradeCircleSmallText}>
                    {activeLesson.homeworkBadge || '11'}
                  </Text>
                </View>
              </View>

              {/* COMMENTS Section */}
              <Text style={styles.diarySectionCapTitle}>COMMENTS</Text>
              {commentsList.map((comm) => (
                <View key={comm.id} style={styles.diaryCommentCard}>
                  <View style={styles.diaryCommentHeaderRow}>
                    <Image source={{ uri: comm.avatar }} style={styles.diaryCommentAvatar} />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <Text style={styles.diaryCommentAuthor}>{comm.author}</Text>
                    </View>
                    <Text style={styles.diaryCommentRole}>{comm.role}</Text>
                  </View>
                  <Text style={styles.diaryCommentBody}>{comm.text}</Text>
                  <TouchableOpacity
                    style={styles.diaryCommentReplyBtn}
                    onPress={() => {
                      showAlert('Reply', `Replying to teacher ${comm.author}...`);
                    }}
                  >
                    <Text style={styles.diaryCommentReplyText}>Reply</Text>
                  </TouchableOpacity>
                </View>
              ))}

              {/* Quick interactive action to add comment */}
              <TouchableOpacity
                style={styles.diaryAddCommentBar}
                activeOpacity={0.8}
                onPress={() => {
                  showAlert('New Note', 'Add personal student note / inquiry for this class.');
                }}
              >
                <Ionicons name="chatbubble-ellipses-outline" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 13 }}>
                  Leave a message for {activeLesson.teacher}
                </Text>
              </TouchableOpacity>
            </ScrollView>

            {/* Bottom Bar Indicator */}
            <View style={styles.diaryHomeIndicatorWrap}>
              <View style={styles.diaryHomeIndicatorBar} />
            </View>
          </SafeAreaView>
        </View>
      );
    }

    // ==========================================
    // VIEW C: GRADES SCREEN (Right Image)
    // ==========================================
    if (diarySubTab === 'Grades') {
      return (
        <View style={[styles.phoneFrame, { backgroundColor: '#5C8BF4' }]}>
          <SafeAreaView style={{ flex: 1 }}>
            {/* Top Bar: Title & Avatar */}
            <View style={styles.diaryTopNavBar}>
              <TouchableOpacity
                style={{ width: 32 }}
                onPress={() => setCurrentScreen('dashboard')}
              >
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.diaryScreenTitle}>Grades</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.diaryTopAvatarWrap}
                onPress={() => setProfileModalVisible(true)}
              >
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80' }}
                  style={styles.diaryTopAvatar}
                />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 16 }}
              showsVerticalScrollIndicator={false}
            >
              {/* General Performance Header & 2021 Year Pill */}
              <View style={styles.diaryGradesHeaderRow}>
                <Text style={styles.diaryPerformanceLabel}>GENERAL PERFORMANCE</Text>
                <View style={styles.diaryYearPill}>
                  <Text style={styles.diaryYearPillText}>2021</Text>
                </View>
              </View>

              {/* Single Unified Card containing all subjects */}
              <View style={styles.diaryGradesCardContainer}>
                {gradesList.map((g, idx) => (
                  <TouchableOpacity
                    key={idx}
                    activeOpacity={0.7}
                    style={[
                      styles.diaryGradeItemRow,
                      idx === gradesList.length - 1 && { borderBottomWidth: 0 },
                    ]}
                    onPress={() => {
                      showAlert(`${g.subject} Grade Breakdown`, `Term Grade: ${g.score}/12\nClass Rank: Top 5%\nTeacher Remarks: Excellent performance!`);
                    }}
                  >
                    <Text style={styles.diaryGradeSubjectName}>{g.subject}</Text>
                    <Text style={styles.diaryGradeSubjectScore}>{g.score}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {/* Bottom Nav */}
            {renderDiaryBottomNav()}
          </SafeAreaView>
        </View>
      );
    }

    // ==========================================
    // VIEW A: SCHEDULE SCREEN (Left Image)
    // ==========================================
    return (
      <View style={[styles.phoneFrame, { backgroundColor: '#5C8BF4' }]}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* Top Bar: Title & Avatar */}
          <View style={styles.diaryTopNavBar}>
            <TouchableOpacity
              style={{ width: 32 }}
              onPress={() => setCurrentScreen('dashboard')}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.diaryScreenTitle}>Schedule</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.diaryTopAvatarWrap}
              onPress={() => setProfileModalVisible(true)}
            >
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80' }}
                style={styles.diaryTopAvatar}
              />
            </TouchableOpacity>
          </View>

          {/* Calendar Day Picker Row */}
          <View style={styles.diaryCalendarStrip}>
            {calendarDays.map((cd) => {
              const isSelected = selectedScheduleDay === cd.dayNum;
              return (
                <TouchableOpacity
                  key={cd.dayNum}
                  activeOpacity={0.8}
                  style={styles.diaryCalendarCol}
                  onPress={() => setSelectedScheduleDay(cd.dayNum)}
                >
                  <Text style={styles.diaryCalendarDayName}>{cd.dayName}</Text>
                  <View
                    style={[
                      styles.diaryCalendarDayCircle,
                      isSelected && styles.diaryCalendarDayCircleSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.diaryCalendarDayNum,
                        isSelected && styles.diaryCalendarDayNumSelected,
                      ]}
                    >
                      {cd.dayNum}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 16 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Unified Schedule White Card */}
            <View style={styles.diaryScheduleCard}>
              {scheduleItems.map((item, idx) => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.85}
                  style={[
                    styles.diaryScheduleRow,
                    idx === scheduleItems.length - 1 && { borderBottomWidth: 0 },
                  ]}
                  onPress={() => setSelectedScheduleLesson(item)}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.diaryScheduleSubject}>{item.subject}</Text>
                    <Text style={styles.diaryScheduleTime}>{item.time}</Text>
                  </View>

                  {/* Badge: dot, number badge, or none */}
                  {item.badge === 'dot' ? (
                    <View style={styles.diaryRedDotBadge} />
                  ) : item.badge ? (
                    <View style={styles.diaryNumberBadge}>
                      <Text style={styles.diaryNumberBadgeText}>{item.badge}</Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              ))}
            </View>

            {/* Out-of-class Separated Pill Card */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.diaryOutOfClassCard}
              onPress={() => {
                showAlert(
                  'Biology (Out-of-class)',
                  'Time: 13:25–14:10\nLocation: Science Botanical Garden\nMentor: Dr. Vance',
                );
              }}
            >
              <View style={styles.diaryOutOfClassRow}>
                <Text style={styles.diaryOutOfClassTitle}>{outOfClassItem.subject}</Text>
                <Text style={styles.diaryOutOfClassTag}> {outOfClassItem.tag}</Text>
              </View>
              <Text style={styles.diaryOutOfClassTime}>{outOfClassItem.time}</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Bottom Nav */}
          {renderDiaryBottomNav()}
        </SafeAreaView>
      </View>
    );
  };

  // ==========================================
  // SCREEN 8: NOTIFICATIONS CENTER
  // ==========================================
  const renderNotificationsScreen = () => {
    const filteredNotifs = notificationsList.filter((item) => {
      if (notifFilter === 'All') return true;
      return item.category === notifFilter;
    });

    const unreadTotal = notificationsList.filter((n) => n.unread).length;

    const markAllRead = () => {
      setNotificationsList((prev) => prev.map((n) => ({ ...n, unread: false })));
      showAlert('Notifications Updated', 'All notifications marked as read.');
    };

    const clearAllNotifs = () => {
      setNotificationsList([]);
      showAlert('Inbox Cleared', 'All notifications have been removed.');
    };

    return (
      <View style={styles.phoneFrame}>
        <ScrollView
          style={styles.screenScrollView}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {renderSubpageHeader('Notifications')}

          {/* Overlapping Summary Pill */}
          <View style={styles.overlappingCardWrap}>
            <View style={styles.todayAttendancePill}>
              <View>
                <Text style={styles.todayAttendanceTitle}>
                  Inbox Status —{' '}
                  <Text style={{ color: unreadTotal > 0 ? '#2563EB' : '#10B981', fontWeight: '700' }}>
                    {unreadTotal > 0 ? `${unreadTotal} New Alerts` : 'All Caught Up'}
                  </Text>
                </Text>
                <Text style={[styles.todayAttendanceBigTime, { color: unreadTotal > 0 ? '#2563EB' : '#10B981' }]}>
                  {unreadTotal} Unread
                </Text>
              </View>
              <View style={[styles.greenCheckmarkCircle, { backgroundColor: '#3B82F6' }]}>
                <Ionicons name="notifications" size={24} color="#FFFFFF" />
              </View>
            </View>
          </View>

          {/* Body Section */}
          <View style={styles.subpageBodyContainer}>
            {/* Action Bar: Mark All Read & Clear */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
              <TouchableOpacity
                style={[styles.actionBannerBtn, { flex: 1, marginRight: 8, marginBottom: 0, justifyContent: 'center' }]}
                activeOpacity={0.8}
                onPress={markAllRead}
              >
                <Ionicons name="checkmark-done-outline" size={18} color="#2563EB" style={{ marginRight: 6 }} />
                <Text style={styles.actionBannerText}>Mark All Read</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionBannerBtn, { flex: 1, marginLeft: 8, marginBottom: 0, justifyContent: 'center', backgroundColor: '#FEF2F2', borderColor: '#FEE2E2' }]}
                activeOpacity={0.8}
                onPress={clearAllNotifs}
              >
                <Ionicons name="trash-outline" size={18} color="#DC2626" style={{ marginRight: 6 }} />
                <Text style={[styles.actionBannerText, { color: '#DC2626' }]}>Clear All</Text>
              </TouchableOpacity>
            </View>

            {/* Filter Tabs: All | Academic | Transport | Fees */}
            <View style={styles.filterTabsRow}>
              {['All', 'Academic', 'Transport', 'Fees'].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[styles.filterTabBtn, notifFilter === tab && styles.filterTabBtnActive]}
                  onPress={() => setNotifFilter(tab)}
                >
                  <Text style={[styles.filterTabText, notifFilter === tab && styles.filterTabTextActive]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Notifications Feed */}
            {filteredNotifs.length === 0 ? (
              <View style={styles.emptyNotifBox}>
                <Ionicons name="notifications-off-outline" size={48} color="#94A3B8" />
                <Text style={styles.emptyNotifTitle}>No Notifications</Text>
                <Text style={styles.emptyNotifDesc}>You have no alerts matching '{notifFilter}' right now.</Text>
              </View>
            ) : (
              filteredNotifs.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.85}
                  style={[styles.notifItemCard, item.unread && styles.notifItemCardUnread]}
                  onPress={() => {
                    setNotificationsList((prev) =>
                      prev.map((n) => (n.id === item.id ? { ...n, unread: false } : n))
                    );
                    showAlert(item.title, `${item.desc}\n\nTime: ${item.time}`);
                  }}
                >
                  <View style={[styles.notifIconCircle, { backgroundColor: item.iconColor }]}>
                    <Ionicons name={item.icon} size={20} color="#FFFFFF" />
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={[styles.notifItemTitle, item.unread && { fontWeight: '800', color: '#0F172A' }]}>
                        {item.title}
                      </Text>
                      {item.unread && <View style={styles.unreadBlueDot} />}
                    </View>
                    <Text style={styles.notifItemDesc} numberOfLines={2}>
                      {item.desc}
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
                      <Text style={styles.notifCategoryTag}>{item.category}</Text>
                      <Text style={styles.notifTimestampText}>{item.time}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>

        {userRole === 'admin' ? renderAdminTabBar() : renderTabBar()}
      </View>
    );
  };

  // ==========================================
  // SCREEN 9: SETTINGS & PREFERENCES
  // ==========================================
  const renderSettingsScreen = () => {
    return (
      <View style={styles.phoneFrame}>
        <ScrollView
          style={styles.screenScrollView}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {renderSubpageHeader('Settings')}

          {/* Overlapping Profile Summary Card */}
          <View style={styles.overlappingCardWrap}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.todayAttendancePill}
              onPress={() => setProfileModalVisible(true)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {userRole === 'admin' ? (
                  <View style={[styles.avatarWrap, { backgroundColor: '#1E293B', justifyContent: 'center', alignItems: 'center' }]}>
                    <Ionicons name="shield-checkmark" size={26} color="#F59E0B" />
                  </View>
                ) : userRole === 'teacher' ? (
                  <View style={[styles.avatarWrap, { backgroundColor: '#2E798A', justifyContent: 'center', alignItems: 'center' }]}>
                    <Ionicons name="school" size={26} color="#FFFFFF" />
                  </View>
                ) : (
                  <StudentAvatar />
                )}
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.settingsStudentName}>
                    {userRole === 'admin' ? 'Dr. Rajesh Khanna' : userRole === 'teacher' ? 'Mrs. Sarah Jenkins' : 'Aarav Sharma'}
                  </Text>
                  <Text style={styles.settingsStudentSub}>
                    {userRole === 'admin' ? 'Chief Administrator' : userRole === 'teacher' ? 'Faculty • Mathematics' : 'Class 6-A • Roll No. 14'}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.settingsEditBadge}
                onPress={() => setProfileModalVisible(true)}
              >
                <Text style={styles.settingsEditBadgeText}>View Profile</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>

          {/* Body Section */}
          <View style={styles.subpageBodyContainer}>
            {/* GROUP 1: NOTIFICATION PREFERENCES */}
            <Text style={styles.settingsGroupTitle}>NOTIFICATION PREFERENCES</Text>
            <View style={styles.settingsGroupCard}>
              <View style={styles.settingsRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.settingsRowTitle}>Push Notifications</Text>
                  <Text style={styles.settingsRowSubtitle}>Instant updates on attendance and bus routes</Text>
                </View>
                <Switch
                  value={pushNotifEnabled}
                  onValueChange={setPushNotifEnabled}
                  trackColor={{ false: '#CBD5E1', true: '#93C5FD' }}
                  thumbColor={pushNotifEnabled ? '#2563EB' : '#F1F5F9'}
                />
              </View>

              <View style={styles.settingsRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.settingsRowTitle}>Email Grade Reports</Text>
                  <Text style={styles.settingsRowSubtitle}>Receive weekly report cards & invoices</Text>
                </View>
                <Switch
                  value={emailAlertsEnabled}
                  onValueChange={setEmailAlertsEnabled}
                  trackColor={{ false: '#CBD5E1', true: '#93C5FD' }}
                  thumbColor={emailAlertsEnabled ? '#2563EB' : '#F1F5F9'}
                />
              </View>

              <View style={[styles.settingsRow, { borderBottomWidth: 0 }]}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.settingsRowTitle}>SMS Emergency Alerts</Text>
                  <Text style={styles.settingsRowSubtitle}>Urgent school broadcasts and holiday alerts</Text>
                </View>
                <Switch
                  value={smsAlertsEnabled}
                  onValueChange={setSmsAlertsEnabled}
                  trackColor={{ false: '#CBD5E1', true: '#93C5FD' }}
                  thumbColor={smsAlertsEnabled ? '#2563EB' : '#F1F5F9'}
                />
              </View>
            </View>

            {/* GROUP 2: SECURITY & APP PREFERENCES */}
            <Text style={styles.settingsGroupTitle}>SECURITY & PREFERENCES</Text>
            <View style={styles.settingsGroupCard}>
              <View style={styles.settingsRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.settingsRowTitle}>Biometric / PIN Login</Text>
                  <Text style={styles.settingsRowSubtitle}>Quick 4-digit numeric keypad auth</Text>
                </View>
                <Switch
                  value={biometricEnabled}
                  onValueChange={setBiometricEnabled}
                  trackColor={{ false: '#CBD5E1', true: '#93C5FD' }}
                  thumbColor={biometricEnabled ? '#2563EB' : '#F1F5F9'}
                />
              </View>

              <TouchableOpacity
                style={styles.settingsRow}
                activeOpacity={0.7}
                onPress={() => setLangModalVisible(true)}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.settingsRowTitle}>Language / भाषा</Text>
                  <Text style={styles.settingsRowSubtitle}>Current: {selectedLang}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 13, color: '#2563EB', fontWeight: '700', marginRight: 4 }}>
                    {selectedLang}
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.settingsRow, { borderBottomWidth: 0 }]}
                activeOpacity={0.7}
                onPress={() => setDialpadModalVisible(true)}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.settingsRowTitle}>Change Login PIN</Text>
                  <Text style={styles.settingsRowSubtitle}>Update quick unlock passcode</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            {/* GROUP 3: SUPPORT & LEGAL */}
            <Text style={styles.settingsGroupTitle}>SUPPORT & LEGAL</Text>
            <View style={styles.settingsGroupCard}>
              <TouchableOpacity
                style={styles.settingsRow}
                activeOpacity={0.7}
                onPress={() => setPrivacyModalVisible(true)}
              >
                <Text style={styles.settingsRowTitle}>Privacy Policy & Terms</Text>
                <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.settingsRow}
                activeOpacity={0.7}
                onPress={() => {
                  showAlert('Support Desk', 'Helpline: 1800-200-3450\nEmail: helpdesk@schoolhox.edu\nHours: Mon-Fri 8:00 AM - 5:00 PM');
                }}
              >
                <Text style={styles.settingsRowTitle}>School Helpdesk & FAQ</Text>
                <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.settingsRow, { borderBottomWidth: 0 }]}
                activeOpacity={0.7}
                onPress={() => {
                  showAlert('App Version', 'SchoolHox Smart School Management\nVersion: 2.4.0 (Build 57.0.28)\nStatus: Connected & Live');
                }}
              >
                <Text style={styles.settingsRowTitle}>About App</Text>
                <Text style={{ fontSize: 12, color: '#94A3B8', fontWeight: '600' }}>v2.4.0</Text>
              </TouchableOpacity>
            </View>

            {/* GROUP 4: FACULTY & TEACHER DASHBOARD (Only visible to Admin & Teacher) */}
            {userRole !== 'student' && (
              <>
                <Text style={styles.settingsGroupTitle}>FACULTY & TEACHER PORTAL</Text>
                <View style={styles.settingsGroupCard}>
                  <TouchableOpacity
                    style={[styles.settingsRow, { backgroundColor: '#F0FDFA' }]}
                    activeOpacity={0.75}
                    onPress={() => {
                      setCurrentScreen('teacher');
                      setTeacherActiveTab('Home');
                    }}
                  >
                    <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#2E798A', justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
                      <Ionicons name="school" size={20} color="#FFFFFF" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.settingsRowTitle, { color: '#0F172A', fontWeight: '800' }]}>Teacher Dashboard</Text>
                        <View style={{ backgroundColor: '#2E798A', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, marginLeft: 8 }}>
                          <Text style={{ fontSize: 10, fontWeight: '800', color: '#FFFFFF' }}>NEW</Text>
                        </View>
                      </View>
                      <Text style={styles.settingsRowSubtitle}>Class 6-A • Attendance, Marks, Timetable</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color="#2E798A" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.settingsRow}
                    activeOpacity={0.7}
                    onPress={() => {
                      setCurrentScreen('teacher_schedule');
                      setTeacherActiveTab('Schedule');
                    }}
                  >
                    <Ionicons name="calendar-outline" size={20} color="#2563EB" style={{ marginRight: 12 }} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.settingsRowTitle}>Teaching Timetable & Schedule</Text>
                      <Text style={styles.settingsRowSubtitle}>View 24 weekly lectures and free periods</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.settingsRow}
                    activeOpacity={0.7}
                    onPress={() => {
                      setCurrentScreen('teacher_exams');
                      setTeacherActiveTab('Exams');
                    }}
                  >
                    <Ionicons name="clipboard-outline" size={20} color="#F59E0B" style={{ marginRight: 12 }} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.settingsRowTitle}>Exams & Marks Entry</Text>
                      <Text style={styles.settingsRowSubtitle}>Record test scores & publish report cards</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.settingsRow, { borderBottomWidth: 0 }]}
                    activeOpacity={0.7}
                    onPress={() => {
                      setCurrentScreen('teacher_ai');
                      setTeacherActiveTab('AskAI');
                    }}
                  >
                    <Ionicons name="sparkles" size={20} color="#7C3AED" style={{ marginRight: 12 }} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.settingsRowTitle}>Ask AI Teaching Copilot</Text>
                      <Text style={styles.settingsRowSubtitle}>Generate quizzes, homework & lesson plans</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                  </TouchableOpacity>
                </View>
              </>
            )}

            {/* Sign Out Button */}
            <TouchableOpacity
              style={styles.settingsSignOutBtn}
              activeOpacity={0.85}
              onPress={() => {
                showAlert('Signed Out', 'You have been successfully signed out.');
                setCurrentScreen('login');
                setUsername(ROLE_CONFIGS[userRole].defaultUser);
                setPassword(ROLE_CONFIGS[userRole].defaultPass);
              }}
            >
              <Ionicons name="log-out-outline" size={20} color="#DC2626" style={{ marginRight: 8 }} />
              <Text style={styles.settingsSignOutText}>Sign Out from SchoolHox</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {userRole === 'admin' ? renderAdminTabBar() : renderTabBar()}
      </View>
    );
  };

  // ==========================================
  // SCREEN 10-A: TEACHER SCHEDULE SCREEN (SEPARATE PAGE)
  // ==========================================
  const renderTeacherScheduleScreen = () => {
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const scheduleByDay = {
      Mon: [
        { id: 1, time: '08:30 - 09:20', subject: 'Mathematics', classRoom: 'Grade 6-A (Room 204)', topic: 'Fractions & Decimals', status: 'Completed' },
        { id: 2, time: '09:30 - 10:15', subject: 'Geometry', classRoom: 'Grade 8-B (Room 302)', topic: 'Triangles & Angles', status: 'Completed' },
        { id: 3, time: '11:00 - 11:45', subject: 'Calculus', classRoom: 'Grade 10-A (Lab 2)', topic: 'Limits & Derivatives', status: 'Completed' },
      ],
      Tue: [
        { id: 4, time: '08:30 - 09:20', subject: 'Applied Math', classRoom: 'Grade 7-C (Room 105)', topic: 'Ratios and Proportions', status: 'Completed' },
        { id: 5, time: '10:30 - 11:15', subject: 'Mathematics', classRoom: 'Grade 6-A (Room 204)', topic: 'Algebraic Expressions', status: 'Completed' },
        { id: 6, time: '01:30 - 02:15', subject: 'Remedial Math', classRoom: 'Grade 8-B (Room 302)', topic: 'Problem Solving Doubt Session', status: 'Completed' },
      ],
      Wed: [
        { id: 7, time: '08:30 - 09:20', subject: 'Mathematics', classRoom: 'Grade 6-A (Room 204)', topic: 'Word Problems on Percentages', status: 'Done' },
        { id: 8, time: '09:30 - 10:15', subject: 'Algebra & Geometry', classRoom: 'Grade 8-B (Room 302)', topic: 'Quadratic Equations', status: 'Ongoing' },
        { id: 9, time: '11:00 - 11:45', subject: 'Advanced Calculus', classRoom: 'Grade 10-A (Lab 2)', topic: 'Definite Integrals', status: 'Upcoming' },
        { id: 10, time: '12:30 - 01:15', subject: 'Applied Mathematics', classRoom: 'Grade 7-C (Room 105)', topic: 'Statistics & Bar Charts', status: 'Upcoming' },
      ],
      Thu: [
        { id: 11, time: '09:00 - 09:45', subject: 'Mathematics', classRoom: 'Grade 6-A (Room 204)', topic: 'Unit Test Revision', status: 'Upcoming' },
        { id: 12, time: '10:00 - 10:45', subject: 'Faculty Meeting', classRoom: 'Conference Hall', topic: 'Academic Review Q1', status: 'Upcoming' },
        { id: 13, time: '11:45 - 12:30', subject: 'Calculus', classRoom: 'Grade 10-A (Lab 2)', topic: 'Integration Techniques', status: 'Upcoming' },
      ],
      Fri: [
        { id: 14, time: '08:30 - 09:20', subject: 'Mathematics', classRoom: 'Grade 6-A (Room 204)', topic: 'Weekly Quiz & Review', status: 'Upcoming' },
        { id: 15, time: '10:30 - 11:15', subject: 'Algebra', classRoom: 'Grade 8-B (Room 302)', topic: 'Linear Inequalities', status: 'Upcoming' },
      ],
      Sat: [
        { id: 16, time: '09:00 - 10:30', subject: 'Extra Coaching', classRoom: 'Grade 10-A (Lab 2)', topic: 'Board Exam Preparation', status: 'Upcoming' },
      ],
    };

    const currentClasses = scheduleByDay[teacherScheduleDay] || [];

    return (
      <View style={[styles.phoneFrame, { backgroundColor: '#F8FAFC' }]}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* Subpage Header */}
          <View style={styles.teacherSubpageHeader}>
            <TouchableOpacity
              style={styles.teacherBackBtn}
              onPress={() => {
                setCurrentScreen('teacher');
                setTeacherActiveTab('Home');
              }}
            >
              <Ionicons name="arrow-back" size={22} color="#0F172A" />
            </TouchableOpacity>
            <Text style={styles.teacherSubpageTitle}>Teaching Schedule</Text>
            <TouchableOpacity
              style={styles.teacherSubpageActionBtn}
              onPress={() => showAlert('Schedule Actions', '• Download Weekly PDF Timetable\n• Request Period Swap\n• Print Class Roster')}
            >
              <Ionicons name="ellipsis-vertical" size={20} color="#0F172A" />
            </TouchableOpacity>
          </View>

          {/* Weekday Selector */}
          <View style={styles.teacherScheduleDayTabs}>
            {weekDays.map((d) => {
              const active = teacherScheduleDay === d;
              return (
                <TouchableOpacity
                  key={d}
                  style={[styles.teacherScheduleDayBtn, active && styles.teacherScheduleDayBtnActive]}
                  onPress={() => setTeacherScheduleDay(d)}
                >
                  <Text style={[styles.teacherScheduleDayText, active && styles.teacherScheduleDayTextActive]}>
                    {d}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <ScrollView style={{ flex: 1, paddingHorizontal: 18 }} showsVerticalScrollIndicator={false}>
            {/* Summary Stat */}
            <View style={styles.teacherScheduleBanner}>
              <View>
                <Text style={{ fontSize: 16, fontWeight: '800', color: '#0F172A' }}>
                  {teacherScheduleDay === 'Wed' ? '4 Lectures Today' : `${currentClasses.length} Scheduled Sessions`}
                </Text>
                <Text style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
                  Academic Term 2 • 24 Weekly Teaching Periods
                </Text>
              </View>
              <TouchableOpacity
                style={styles.teacherScheduleSwapBtn}
                onPress={() => showAlert('Period Substitution', 'No active substitution requests for this date.')}
              >
                <Text style={styles.teacherScheduleSwapText}>Swap</Text>
              </TouchableOpacity>
            </View>

            {/* List of Periods */}
            <View style={{ marginTop: 14, paddingBottom: 24 }}>
              {currentClasses.map((item, idx) => (
                <View key={item.id} style={styles.teacherScheduleCard}>
                  <View style={styles.teacherScheduleTimeCol}>
                    <Text style={styles.teacherScheduleTimeText}>{item.time.split(' - ')[0]}</Text>
                    <Text style={styles.teacherScheduleTimeSub}>{item.time.split(' - ')[1]}</Text>
                    <View style={[styles.teacherScheduleStatusBadge, {
                      backgroundColor: item.status === 'Done' || item.status === 'Completed' ? '#ECFDF5' : item.status === 'Ongoing' ? '#EFF6FF' : '#F8FAFC'
                    }]}>
                      <Text style={{
                        fontSize: 10,
                        fontWeight: '700',
                        color: item.status === 'Done' || item.status === 'Completed' ? '#059669' : item.status === 'Ongoing' ? '#2563EB' : '#64748B'
                      }}>
                        {item.status}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.teacherScheduleContentCol}>
                    <Text style={styles.teacherScheduleClassSubject}>{item.subject}</Text>
                    <Text style={styles.teacherScheduleClassRoom}>{item.classRoom}</Text>
                    <View style={styles.teacherScheduleTopicRow}>
                      <Ionicons name="book-outline" size={13} color="#2563EB" style={{ marginRight: 4 }} />
                      <Text style={styles.teacherScheduleTopicText}>{item.topic}</Text>
                    </View>

                    <View style={styles.teacherScheduleActionRow}>
                      <TouchableOpacity
                        style={styles.teacherScheduleMiniBtn}
                        onPress={() => setTeacherAttendanceModal(true)}
                      >
                        <Ionicons name="checkbox-outline" size={13} color="#2E798A" style={{ marginRight: 3 }} />
                        <Text style={styles.teacherScheduleMiniBtnText}>Attendance</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.teacherScheduleMiniBtn, { backgroundColor: '#F1F5F9' }]}
                        onPress={() => setTeacherMarksModal(true)}
                      >
                        <Ionicons name="create-outline" size={13} color="#3B82F6" style={{ marginRight: 3 }} />
                        <Text style={[styles.teacherScheduleMiniBtnText, { color: '#3B82F6' }]}>Marks</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Teacher Bottom Tabs */}
          <View style={styles.teacherBottomNavBar}>
            {[
              { id: 'Home', icon: 'home-outline', label: 'Home' },
              { id: 'Students', icon: 'people-outline', label: 'Students' },
              { id: 'Schedule', icon: 'calendar', label: 'Schedule' },
              { id: 'Exams', icon: 'clipboard-outline', label: 'Exams' },
              { id: 'AskAI', icon: 'chatbubble-ellipses-outline', label: 'Ask AI' },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={styles.teacherBottomTab}
                onPress={() => {
                  setTeacherActiveTab(tab.id);
                  if (tab.id === 'Home') setCurrentScreen('teacher');
                  if (tab.id === 'Students') setTeacherStudentsModal(true);
                  if (tab.id === 'Schedule') setCurrentScreen('teacher_schedule');
                  if (tab.id === 'Exams') setCurrentScreen('teacher_exams');
                  if (tab.id === 'AskAI') setCurrentScreen('teacher_ai');
                }}
              >
                <Ionicons
                  name={tab.icon}
                  size={22}
                  color={teacherActiveTab === tab.id ? '#2E798A' : '#94A3B8'}
                />
                <Text
                  style={[
                    styles.teacherBottomTabLabel,
                    teacherActiveTab === tab.id && styles.teacherBottomTabLabelActive,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
      </View>
    );
  };

  // ==========================================
  // SCREEN 10-B: TEACHER EXAMS & MARKS SCREEN (SEPARATE PAGE)
  // ==========================================
  const renderTeacherExamsScreen = () => {
    const examsList = [
      { id: 1, title: 'Unit Test 1 - Algebra & Sets', class: 'Grade 6-A', date: 'Feb 10, 2026', total: 40, graded: 40, avg: '86%', status: 'Graded' },
      { id: 2, title: 'Periodic Assessment 2 - Geometry', class: 'Grade 8-B', date: 'Feb 12, 2026', total: 38, graded: 38, avg: '79%', status: 'Graded' },
      { id: 3, title: 'Mid-Term Examination - Calculus', class: 'Grade 10-A', date: 'Feb 14, 2026', total: 42, graded: 18, avg: 'Pending', status: 'Grading' },
      { id: 4, title: 'Surprise Quiz - Probability', class: 'Grade 7-C', date: 'Feb 18, 2026', total: 35, graded: 0, avg: 'Upcoming', status: 'Upcoming' },
    ];

    const filtered = examsList.filter(e => {
      if (teacherExamFilter === 'All') return true;
      if (teacherExamFilter === 'Graded') return e.status === 'Graded';
      if (teacherExamFilter === 'Pending') return e.status === 'Grading';
      return true;
    });

    return (
      <View style={[styles.phoneFrame, { backgroundColor: '#F8FAFC' }]}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* Subpage Header */}
          <View style={styles.teacherSubpageHeader}>
            <TouchableOpacity
              style={styles.teacherBackBtn}
              onPress={() => {
                setCurrentScreen('teacher');
                setTeacherActiveTab('Home');
              }}
            >
              <Ionicons name="arrow-back" size={22} color="#0F172A" />
            </TouchableOpacity>
            <Text style={styles.teacherSubpageTitle}>Exams & Grading</Text>
            <TouchableOpacity
              style={styles.teacherSubpageActionBtn}
              onPress={() => setTeacherMarksModal(true)}
            >
              <Ionicons name="add-circle" size={24} color="#2E798A" />
            </TouchableOpacity>
          </View>

          {/* Filter Pills */}
          <View style={styles.teacherExamFilterRow}>
            {['All', 'Graded', 'Pending'].map((f) => {
              const active = teacherExamFilter === f;
              return (
                <TouchableOpacity
                  key={f}
                  style={[styles.teacherExamFilterPill, active && styles.teacherExamFilterPillActive]}
                  onPress={() => setTeacherExamFilter(f)}
                >
                  <Text style={[styles.teacherExamFilterText, active && styles.teacherExamFilterTextActive]}>
                    {f} Exams
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <ScrollView style={{ flex: 1, paddingHorizontal: 18 }} showsVerticalScrollIndicator={false}>
            {/* Quick Action Enter Marks Banner */}
            <View style={styles.teacherMarksBannerCard}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: '800', color: '#FFFFFF' }}>Pending Evaluation</Text>
                <Text style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.85)', marginTop: 2 }}>
                  Grade 10-A Calculus: 24 student sheets remaining
                </Text>
              </View>
              <TouchableOpacity
                style={styles.teacherMarksBannerBtn}
                onPress={() => setTeacherMarksModal(true)}
              >
                <Text style={styles.teacherMarksBannerBtnText}>Enter Marks</Text>
              </TouchableOpacity>
            </View>

            {/* List of Exams */}
            <Text style={[styles.teacherSectionHeading, { marginTop: 18 }]}>Assigned Tests & Quizzes</Text>
            <View style={{ marginTop: 8, paddingBottom: 24 }}>
              {filtered.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.teacherExamItemCard}
                  activeOpacity={0.8}
                  onPress={() => setTeacherMarksModal(true)}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.teacherExamClassBadge}>{item.class}</Text>
                    <View style={[styles.teacherExamStatusBadge, {
                      backgroundColor: item.status === 'Graded' ? '#ECFDF5' : item.status === 'Grading' ? '#FEF3C7' : '#EFF6FF'
                    }]}>
                      <Text style={{
                        fontSize: 11,
                        fontWeight: '700',
                        color: item.status === 'Graded' ? '#059669' : item.status === 'Grading' ? '#D97706' : '#2563EB'
                      }}>
                        {item.status}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.teacherExamTitleText}>{item.title}</Text>
                  <Text style={{ fontSize: 12, color: '#64748B', marginTop: 3 }}>Date: {item.date}</Text>

                  <View style={styles.teacherExamFooterRow}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Ionicons name="people-outline" size={14} color="#64748B" style={{ marginRight: 4 }} />
                      <Text style={{ fontSize: 12, color: '#64748B', fontWeight: '600' }}>
                        {item.graded}/{item.total} evaluated
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {item.status === 'Graded' && (
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#EFF6FF',
                            paddingHorizontal: 8,
                            paddingVertical: 3,
                            borderRadius: 6,
                            marginRight: 8,
                          }}
                          onPress={(e) => {
                            e.stopPropagation?.();
                            setSelectedStudentForReport(masterStudentsList[0]);
                            setCurrentScreen('report_card');
                          }}
                        >
                          <Ionicons name="ribbon-outline" size={12} color="#1E3A8A" style={{ marginRight: 3 }} />
                          <Text style={{ fontSize: 10, fontWeight: '800', color: '#1E3A8A' }}>Report Cards</Text>
                        </TouchableOpacity>
                      )}
                      <Text style={{ fontSize: 12, color: '#0F172A', fontWeight: '700' }}>
                        Avg: {item.avg}
                      </Text>
                      <Ionicons name="chevron-forward" size={14} color="#94A3B8" style={{ marginLeft: 4 }} />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Teacher Bottom Tabs */}
          <View style={styles.teacherBottomNavBar}>
            {[
              { id: 'Home', icon: 'home-outline', label: 'Home' },
              { id: 'Students', icon: 'people-outline', label: 'Students' },
              { id: 'Schedule', icon: 'calendar-outline', label: 'Schedule' },
              { id: 'Exams', icon: 'clipboard', label: 'Exams' },
              { id: 'AskAI', icon: 'chatbubble-ellipses-outline', label: 'Ask AI' },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={styles.teacherBottomTab}
                onPress={() => {
                  setTeacherActiveTab(tab.id);
                  if (tab.id === 'Home') setCurrentScreen('teacher');
                  if (tab.id === 'Students') setTeacherStudentsModal(true);
                  if (tab.id === 'Schedule') setCurrentScreen('teacher_schedule');
                  if (tab.id === 'Exams') setCurrentScreen('teacher_exams');
                  if (tab.id === 'AskAI') setCurrentScreen('teacher_ai');
                }}
              >
                <Ionicons
                  name={tab.icon}
                  size={22}
                  color={teacherActiveTab === tab.id ? '#2E798A' : '#94A3B8'}
                />
                <Text
                  style={[
                    styles.teacherBottomTabLabel,
                    teacherActiveTab === tab.id && styles.teacherBottomTabLabelActive,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
      </View>
    );
  };

  // ==========================================
  // SCREEN 10-C: TEACHER ASK AI ASSISTANT (SEPARATE PAGE)
  // ==========================================
  const renderTeacherAiScreen = () => {
    const handleSendAiMessage = (queryText) => {
      const q = (queryText || teacherAiQuery).trim();
      if (!q) return;

      const userMsg = { id: Date.now(), sender: 'teacher', text: q };
      let reply = 'I have noted your teaching request. Generating detailed classroom materials now...';

      if (q.toLowerCase().includes('lesson') || q.toLowerCase().includes('plan')) {
        reply = '📘 Lesson Plan for Grade 6-A (Fractions):\n1. Intro (10 min): Real-life pizza slice analogy.\n2. Guided Practice (20 min): Common denominators.\n3. Independent Work (10 min): Textbook Ex 4.2.\n4. Exit Ticket (5 min): 2 quick questions.';
      } else if (q.toLowerCase().includes('quiz') || q.toLowerCase().includes('test')) {
        reply = '📝 5-Question Pop Quiz Ready:\nQ1: Simplify 18/24.\nQ2: Add 3/5 + 2/7.\nQ3: Find reciprocal of 4/9.\nQ4: Convert 2.75 to mixed fraction.\nQ5: Word problem on discount percentage.';
      } else if (q.toLowerCase().includes('homework') || q.toLowerCase().includes('assignment')) {
        reply = '✅ Homework Assignment drafted:\n"Solve Chapter 5 Exercises 1 through 10 on page 78. Show all working steps." Would you like me to publish this to Grade 6-A?';
      }

      const aiMsg = { id: Date.now() + 1, sender: 'ai', text: reply };
      setTeacherAiChat(prev => [...prev, userMsg, aiMsg]);
      setTeacherAiQuery('');
    };

    return (
      <View style={[styles.phoneFrame, { backgroundColor: '#F8FAFC' }]}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* Header */}
          <View style={styles.teacherSubpageHeader}>
            <TouchableOpacity
              style={styles.teacherBackBtn}
              onPress={() => {
                setCurrentScreen('teacher');
                setTeacherActiveTab('Home');
              }}
            >
              <Ionicons name="arrow-back" size={22} color="#0F172A" />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.teacherSubpageTitle}>Ask AI Assistant</Text>
              <Text style={{ fontSize: 11, color: '#059669', fontWeight: '700' }}>● Teacher Copilot Online</Text>
            </View>
            <TouchableOpacity
              style={styles.teacherSubpageActionBtn}
              onPress={() => {
                setTeacherAiChat([
                  { id: 1, sender: 'ai', text: 'Chat history cleared. How can I help your teaching today?' }
                ]);
              }}
            >
              <Ionicons name="refresh-outline" size={20} color="#0F172A" />
            </TouchableOpacity>
          </View>

          {/* Quick AI Prompts */}
          <View style={styles.teacherAiQuickPromptsRow}>
            {[
              'Create 15-min Math Quiz',
              'Draft Grade 6-A Homework',
              'Explain Quadratic Formula',
            ].map((p, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.teacherAiPromptChip}
                onPress={() => handleSendAiMessage(p)}
              >
                <Text style={styles.teacherAiPromptChipText}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Messages ScrollView */}
          <ScrollView style={{ flex: 1, paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
            {teacherAiChat.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <View
                  key={msg.id}
                  style={[
                    styles.teacherAiMessageWrap,
                    isAi ? styles.teacherAiMessageLeft : styles.teacherAiMessageRight,
                  ]}
                >
                  {isAi && (
                    <View style={styles.teacherAiAvatarBox}>
                      <Ionicons name="sparkles" size={16} color="#FFFFFF" />
                    </View>
                  )}
                  <View
                    style={[
                      styles.teacherAiMessageBubble,
                      isAi ? styles.teacherAiBubbleLeft : styles.teacherAiBubbleRight,
                    ]}
                  >
                    <Text
                      style={[
                        styles.teacherAiMessageText,
                        isAi ? { color: '#0F172A' } : { color: '#FFFFFF' },
                      ]}
                    >
                      {msg.text}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>

          {/* Input Bar */}
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={styles.teacherAiInputRow}>
              <TextInput
                style={styles.teacherAiTextInput}
                placeholder="Ask AI: e.g. Lesson plan, quiz questions..."
                placeholderTextColor="#94A3B8"
                value={teacherAiQuery}
                onChangeText={setTeacherAiQuery}
                onSubmitEditing={() => handleSendAiMessage()}
              />
              <TouchableOpacity
                style={styles.teacherAiSendBtn}
                onPress={() => handleSendAiMessage()}
              >
                <Ionicons name="send" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>

          {/* Teacher Bottom Tabs */}
          <View style={styles.teacherBottomNavBar}>
            {[
              { id: 'Home', icon: 'home-outline', label: 'Home' },
              { id: 'Students', icon: 'people-outline', label: 'Students' },
              { id: 'Schedule', icon: 'calendar-outline', label: 'Schedule' },
              { id: 'Exams', icon: 'clipboard-outline', label: 'Exams' },
              { id: 'AskAI', icon: 'chatbubble-ellipses', label: 'Ask AI' },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={styles.teacherBottomTab}
                onPress={() => {
                  setTeacherActiveTab(tab.id);
                  if (tab.id === 'Home') setCurrentScreen('teacher');
                  if (tab.id === 'Students') setTeacherStudentsModal(true);
                  if (tab.id === 'Schedule') setCurrentScreen('teacher_schedule');
                  if (tab.id === 'Exams') setCurrentScreen('teacher_exams');
                  if (tab.id === 'AskAI') setCurrentScreen('teacher_ai');
                }}
              >
                <Ionicons
                  name={tab.icon}
                  size={22}
                  color={teacherActiveTab === tab.id ? '#2E798A' : '#94A3B8'}
                />
                <Text
                  style={[
                    styles.teacherBottomTabLabel,
                    teacherActiveTab === tab.id && styles.teacherBottomTabLabelActive,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
      </View>
    );
  };

  // ==========================================
  // SCREEN 10: TEACHER MOBILE DASHBOARD (EXACT DESIGN)
  // ==========================================
  const renderTeacherDashboardScreen = () => {
    // Calendar days for Teacher calendar strip (Sun 8 to Sat 14)
    const teacherDays = [
      { day: 'Sun', num: 8 },
      { day: 'Mon', num: 9 },
      { day: 'Tue', num: 10 },
      { day: 'Wed', num: 11 },
      { day: 'Thu', num: 12 },
      { day: 'Fri', num: 13 },
      { day: 'Sat', num: 14 },
    ];

    // Months list for dropdown
    const months = ['JAN-2026', 'FEB-2026', 'MAR-2026', 'APR-2026'];

    // Timetable / Assigned classes for today
    const teacherTodaySchedule = [
      { id: 1, time: '08:30 - 09:20', subject: 'Mathematics', classRoom: 'Grade 6-A (Room 204)', status: 'Done', color: '#10B981' },
      { id: 2, time: '09:30 - 10:15', subject: 'Algebra & Geometry', classRoom: 'Grade 8-B (Room 302)', status: 'Ongoing', color: '#3B82F6' },
      { id: 3, time: '11:00 - 11:45', subject: 'Advanced Calculus', classRoom: 'Grade 10-A (Lab 2)', status: 'Upcoming', color: '#F59E0B' },
      { id: 4, time: '12:30 - 01:15', subject: 'Applied Mathematics', classRoom: 'Grade 7-C (Room 105)', status: 'Upcoming', color: '#64748B' },
    ];

    return (
      <View style={[styles.phoneFrame, { backgroundColor: '#F8FAFC' }]}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* TOP APP BAR: Menu | Home | Calendar 26 | Bell */}
          <View style={styles.teacherTopBar}>
            <TouchableOpacity
              style={styles.teacherIconBtn}
              onPress={() => setTeacherDrawerModal(true)}
            >
              <Ionicons name="menu-outline" size={26} color="#0F172A" />
            </TouchableOpacity>

            <Text style={styles.teacherTopTitle}>Home</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {userRole === 'admin' && (
                <TouchableOpacity
                  style={[styles.teacherCalBadgeBtn, { backgroundColor: '#EFF6FF', borderColor: '#3B82F6', marginRight: 6 }]}
                  onPress={() => {
                    setCurrentScreen('edusphere_admin');
                    setAdminActiveTab('Dashboard');
                  }}
                >
                  <Ionicons name="shield-checkmark" size={16} color="#2563EB" />
                  <Text style={[styles.teacherCalBadgeText, { color: '#2563EB', fontSize: 11, fontWeight: '700' }]}>Admin</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.teacherCalBadgeBtn}
                onPress={() => {
                  showAlert('School Academic Calendar', 'Academic Session 2025-2026\nToday is 26th Working Day of Term 2.');
                }}
              >
                <Ionicons name="calendar-outline" size={18} color="#0F172A" />
                <Text style={styles.teacherCalBadgeText}>26</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.teacherBellBtn}
                onPress={() => {
                  setCurrentScreen('notifications');
                  setActiveTab('Notifications');
                }}
              >
                <Ionicons name="notifications-outline" size={22} color="#0F172A" />
                <View style={styles.teacherNotifDot} />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
          >
            {/* SEARCH PAGES BAR */}
            <View style={styles.teacherSearchWrap}>
              <Ionicons name="search-outline" size={20} color="#94A3B8" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.teacherSearchInput}
                placeholder="Search pages..."
                placeholderTextColor="#94A3B8"
                value={teacherSearchQuery}
                onChangeText={setTeacherSearchQuery}
              />
              {teacherSearchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setTeacherSearchQuery('')}>
                  <Ionicons name="close-circle" size={18} color="#94A3B8" />
                </TouchableOpacity>
              )}
            </View>

            {/* HERO CARD: MARK ATTENDANCE */}
            <View style={styles.teacherHeroCard}>
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text style={styles.teacherHeroTitle}>Mark Attendance</Text>
                <Text style={styles.teacherHeroSubtitle}>
                  Track daily attendance for your class
                </Text>

                <TouchableOpacity
                  activeOpacity={0.85}
                  style={styles.teacherAddNowBtn}
                  onPress={() => {
                    setAttendanceClass('Grade 6-A');
                    setCurrentScreen('attendance_hub');
                  }}
                >
                  <Ionicons
                    name={isAttendanceMarkedToday ? "checkmark-circle" : "checkmark-circle-outline"}
                    size={17}
                    color="#2E798A"
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.teacherAddNowText}>
                    {isAttendanceMarkedToday ? 'Marked (38/40)' : 'Add Now'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* 3D Colorful Pie Chart Illustration */}
              <View style={styles.teacherChartWrap}>
                <Svg width={96} height={96} viewBox="0 0 100 100">
                  {/* Yellow Sector */}
                  <Path d="M 50 50 L 50 10 A 40 40 0 0 1 88 38 Z" fill="#FACC15" />
                  {/* Cyan / Blue Sector */}
                  <Path d="M 50 50 L 12 62 A 40 40 0 0 1 50 10 Z" fill="#67E8F9" />
                  {/* Red/Coral Sector */}
                  <Path d="M 50 50 L 90 50 A 40 40 0 0 1 50 90 A 40 40 0 0 1 12 62 Z" fill="#FB7185" />
                  {/* Mini Vertical Bar Chart on the right */}
                  <Rect x="64" y="22" width="4" height="12" rx="2" fill="#EAB308" />
                  <Rect x="72" y="16" width="4" height="18" rx="2" fill="#3B82F6" />
                  <Rect x="80" y="12" width="4" height="22" rx="2" fill="#EF4444" />
                </Svg>
              </View>
            </View>

            {/* QUICK ACCESS SECTION */}
            <Text style={styles.teacherSectionHeading}>Quick Access</Text>
            <View style={styles.teacherQuickAccessRow}>
              {/* 1. Mark Attendance Hub */}
              <TouchableOpacity
                style={styles.teacherQuickCard}
                activeOpacity={0.8}
                onPress={() => {
                  setAttendanceClass('Grade 6-A');
                  setCurrentScreen('attendance_hub');
                }}
              >
                <View style={[styles.teacherQuickIconBox, { backgroundColor: '#059669' }]}>
                  <Ionicons name="checkbox-outline" size={26} color="#FFFFFF" />
                </View>
                <Text style={styles.teacherQuickLabel}>Class{'\n'}Register</Text>
              </TouchableOpacity>

              {/* 2. Add Homework */}
              <TouchableOpacity
                style={styles.teacherQuickCard}
                activeOpacity={0.8}
                onPress={() => setTeacherHomeworkModal(true)}
              >
                <View style={[styles.teacherQuickIconBox, { backgroundColor: '#38BDF8' }]}>
                  <Ionicons name="document-text" size={26} color="#FFFFFF" />
                </View>
                <Text style={styles.teacherQuickLabel}>Add{'\n'}Homework</Text>
              </TouchableOpacity>

              {/* 3. Students */}
              <TouchableOpacity
                style={styles.teacherQuickCard}
                activeOpacity={0.8}
                onPress={() => setTeacherStudentsModal(true)}
              >
                <View style={[styles.teacherQuickIconBox, { backgroundColor: '#F59E0B' }]}>
                  <Ionicons name="people" size={26} color="#FFFFFF" />
                </View>
                <Text style={styles.teacherQuickLabel}>Students</Text>
              </TouchableOpacity>

              {/* 4. Class Fee Register */}
              <TouchableOpacity
                style={styles.teacherQuickCard}
                activeOpacity={0.8}
                onPress={() => {
                  setFeeClassFilter('Grade 6-A');
                  setCurrentScreen('admin_finance');
                }}
              >
                <View style={[styles.teacherQuickIconBox, { backgroundColor: '#0284C7' }]}>
                  <Ionicons name="wallet-outline" size={26} color="#FFFFFF" />
                </View>
                <Text style={styles.teacherQuickLabel}>Fee{'\n'}Register</Text>
              </TouchableOpacity>
            </View>

            {/* CALENDAR SECTION */}
            <Text style={styles.teacherSectionHeading}>Calendar</Text>
            <View style={styles.teacherCalendarCard}>
              <View style={styles.teacherCalendarStripRow}>
                {teacherDays.map((item) => {
                  const isSelected = teacherSelectedDate === item.num;
                  return (
                    <TouchableOpacity
                      key={item.num}
                      activeOpacity={0.75}
                      style={styles.teacherCalendarDayCol}
                      onPress={() => setTeacherSelectedDate(item.num)}
                    >
                      <Text style={styles.teacherCalDayName}>{item.day}</Text>
                      <View
                        style={[
                          styles.teacherCalDayNumBox,
                          isSelected && styles.teacherCalDayNumBoxSelected,
                        ]}
                      >
                        <Text
                          style={[
                            styles.teacherCalDayNumText,
                            isSelected && styles.teacherCalDayNumTextSelected,
                          ]}
                        >
                          {item.num}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}

                {/* Right Arrow Chevron Button */}
                <TouchableOpacity
                  style={styles.teacherCalendarArrowBtn}
                  onPress={() => {
                    showAlert('Calendar Scroll', 'Showing next academic week (Feb 15 - Feb 21)');
                  }}
                >
                  <Ionicons name="chevron-forward" size={18} color="#2563EB" />
                </TouchableOpacity>
              </View>
            </View>

            {/* ATTENDANCE REPORT & MONTH DROPDOWN */}
            <View style={styles.teacherReportHeaderRow}>
              <Text style={styles.teacherSectionHeadingInline}>Attendance Report</Text>
              <TouchableOpacity
                style={styles.teacherMonthPill}
                onPress={() => {
                  showAlert('Select Report Month', 'Available Months:\n• FEB-2026 (Active)\n• JAN-2026\n• DEC-2025\n• NOV-2025');
                }}
              >
                <Text style={styles.teacherMonthPillText}>{teacherSelectedMonth}</Text>
                <Ionicons name="chevron-down" size={14} color="#2563EB" style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </View>

            {/* ATTENDANCE REPORT SUMMARY GRAPH CARD */}
            <View style={styles.teacherReportCard}>
              <View style={styles.teacherReportTopMetrics}>
                <View>
                  <Text style={styles.teacherReportBigPercent}>94.2%</Text>
                  <Text style={styles.teacherReportSubtext}>Avg Student Attendance</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: '#10B981' }}>+2.4% vs Jan</Text>
                  <Text style={{ fontSize: 11, color: '#94A3B8' }}>38/40 Active Students</Text>
                </View>
              </View>

              {/* Weekly bar graph indicator */}
              <View style={styles.teacherReportGraphBars}>
                {[
                  { d: 'Mon', h: 85, color: '#10B981' },
                  { d: 'Tue', h: 95, color: '#10B981' },
                  { d: 'Wed', h: 92, color: '#2563EB' },
                  { d: 'Thu', h: 88, color: '#10B981' },
                  { d: 'Fri', h: 96, color: '#10B981' },
                  { d: 'Sat', h: 70, color: '#F59E0B' },
                ].map((bar, i) => (
                  <View key={i} style={{ alignItems: 'center', flex: 1 }}>
                    <View style={styles.teacherBarBackground}>
                      <View style={[styles.teacherBarFill, { height: `${bar.h}%`, backgroundColor: bar.color }]} />
                    </View>
                    <Text style={styles.teacherBarDayLabel}>{bar.d}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* TODAY'S TIMETABLE & ASSIGNED CLASSES */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 18, marginBottom: 10 }}>
              <Text style={styles.teacherSectionHeadingInline}>Today's Assigned Classes</Text>
              <TouchableOpacity onPress={() => setTeacherMarksModal(true)}>
                <Text style={{ fontSize: 12, fontWeight: '700', color: '#2563EB' }}>Enter Marks ➔</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.teacherClassesListCard}>
              {teacherTodaySchedule.map((cls, idx) => (
                <TouchableOpacity
                  key={cls.id}
                  style={[
                    styles.teacherClassItemRow,
                    idx === teacherTodaySchedule.length - 1 && { borderBottomWidth: 0 },
                  ]}
                  activeOpacity={0.7}
                  onPress={() => {
                    showAlert(cls.subject, `Time: ${cls.time}\nRoom: ${cls.classRoom}\nStatus: ${cls.status}\nSyllabus: Chapter 4 Exercise 2`);
                  }}
                >
                  <View style={[styles.teacherClassBadgeDot, { backgroundColor: cls.color }]} />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.teacherClassSubject}>{cls.subject}</Text>
                    <Text style={styles.teacherClassTime}>{cls.time} • {cls.classRoom}</Text>
                  </View>
                  <View style={[styles.teacherClassStatusPill, { backgroundColor: `${cls.color}15` }]}>
                    <Text style={[styles.teacherClassStatusText, { color: cls.color }]}>{cls.status}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* TEACHER BOTTOM NAVIGATION (Home | Students | Schedule | Exams | Ask AI) */}
          <View style={styles.teacherBottomNavBar}>
            <TouchableOpacity
              style={styles.teacherBottomTab}
              onPress={() => setTeacherActiveTab('Home')}
            >
              <Ionicons
                name={teacherActiveTab === 'Home' ? "home" : "home-outline"}
                size={22}
                color={teacherActiveTab === 'Home' ? "#2E798A" : "#94A3B8"}
              />
              <Text
                style={[
                  styles.teacherBottomTabLabel,
                  teacherActiveTab === 'Home' && styles.teacherBottomTabLabelActive,
                ]}
              >
                Home
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.teacherBottomTab}
              onPress={() => {
                setTeacherActiveTab('Students');
                setCurrentScreen('teacher_students');
              }}
            >
              <Ionicons
                name={teacherActiveTab === 'Students' ? "people" : "people-outline"}
                size={22}
                color={teacherActiveTab === 'Students' ? "#2E798A" : "#94A3B8"}
              />
              <Text
                style={[
                  styles.teacherBottomTabLabel,
                  teacherActiveTab === 'Students' && styles.teacherBottomTabLabelActive,
                ]}
              >
                Students
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.teacherBottomTab}
              onPress={() => {
                setTeacherActiveTab('Schedule');
                setCurrentScreen('teacher_schedule');
              }}
            >
              <Ionicons
                name={teacherActiveTab === 'Schedule' ? "calendar" : "calendar-outline"}
                size={22}
                color={teacherActiveTab === 'Schedule' ? "#2E798A" : "#94A3B8"}
              />
              <Text
                style={[
                  styles.teacherBottomTabLabel,
                  teacherActiveTab === 'Schedule' && styles.teacherBottomTabLabelActive,
                ]}
              >
                Schedule
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.teacherBottomTab}
              onPress={() => {
                setTeacherActiveTab('Exams');
                setCurrentScreen('teacher_exams');
              }}
            >
              <Ionicons
                name={teacherActiveTab === 'Exams' ? "clipboard" : "clipboard-outline"}
                size={22}
                color={teacherActiveTab === 'Exams' ? "#2E798A" : "#94A3B8"}
              />
              <Text
                style={[
                  styles.teacherBottomTabLabel,
                  teacherActiveTab === 'Exams' && styles.teacherBottomTabLabelActive,
                ]}
              >
                Exams
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.teacherBottomTab}
              onPress={() => {
                setTeacherActiveTab('AskAI');
                setCurrentScreen('teacher_ai');
              }}
            >
              <Ionicons
                name={teacherActiveTab === 'AskAI' ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"}
                size={22}
                color={teacherActiveTab === 'AskAI' ? "#2E798A" : "#94A3B8"}
              />
              <Text
                style={[
                  styles.teacherBottomTabLabel,
                  teacherActiveTab === 'AskAI' && styles.teacherBottomTabLabelActive,
                ]}
              >
                Ask AI
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  };

  // ==========================================
  // BOTTOM NAVIGATION TAB BAR
  // ==========================================
  const renderTabBar = () => (
    <View style={styles.bottomNavContainer}>
      <TouchableOpacity
        style={styles.navTabItem}
        onPress={() => {
          setActiveTab('Home');
          setCurrentScreen('dashboard');
        }}
      >
        <Ionicons
          name={activeTab === 'Home' ? 'home' : 'home-outline'}
          size={22}
          color={activeTab === 'Home' ? '#2563EB' : '#94A3B8'}
        />
        <Text style={[styles.navTabLabel, activeTab === 'Home' && styles.navTabLabelActive]}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navTabItem}
        onPress={() => {
          setActiveTab('Attendance');
          setCurrentScreen('attendance');
        }}
      >
        <Ionicons
          name={activeTab === 'Attendance' ? 'time' : 'time-outline'}
          size={22}
          color={activeTab === 'Attendance' ? '#2563EB' : '#94A3B8'}
        />
        <Text style={[styles.navTabLabel, activeTab === 'Attendance' && styles.navTabLabelActive]}>
          Attendance
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navTabItem}
        onPress={() => {
          setActiveTab('Homework');
          setCurrentScreen('homework');
        }}
      >
        <Ionicons
          name={activeTab === 'Homework' ? 'document-text' : 'document-text-outline'}
          size={22}
          color={activeTab === 'Homework' ? '#2563EB' : '#94A3B8'}
        />
        <Text style={[styles.navTabLabel, activeTab === 'Homework' && styles.navTabLabelActive]}>
          Homework
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navTabItem}
        onPress={() => {
          setActiveTab('Fees');
          setCurrentScreen('fees');
        }}
      >
        <Text style={[styles.feesRupeeTab, { color: activeTab === 'Fees' ? '#2563EB' : '#94A3B8' }]}>
          ₹
        </Text>
        <Text style={[styles.navTabLabel, activeTab === 'Fees' && styles.navTabLabelActive]}>
          Fees
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navTabItem}
        onPress={() => {
          setActiveTab('More');
          setCurrentScreen('settings');
        }}
      >
        <Ionicons
          name={activeTab === 'More' ? 'settings' : 'settings-outline'}
          size={22}
          color={activeTab === 'More' ? '#2563EB' : '#94A3B8'}
        />
        <Text style={[styles.navTabLabel, activeTab === 'More' && styles.navTabLabelActive]}>
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.appRoot}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Screen Router */}
      {currentScreen === 'login' && renderLoginScreen()}
      {currentScreen === 'dashboard' && renderDashboardScreen()}
      {currentScreen === 'parent_dashboard' && renderParentDashboardScreen()}
      {currentScreen === 'edusphere_admin' && renderEduSphereAdminScreen()}
      {currentScreen === 'admin_faculty' && renderAdminFacultyScreen()}
      {currentScreen === 'admin_finance' && renderAdminFinanceScreen()}
      {currentScreen === 'attendance' && renderAttendanceScreen()}
      {currentScreen === 'fees' && renderFeesScreen()}
      {currentScreen === 'homework' && renderHomeworkScreen()}
      {currentScreen === 'bus' && renderBusScreen()}
      {currentScreen === 'smartdiary' && renderSmartDiaryScreen()}
      {currentScreen === 'notifications' && renderNotificationsScreen()}
      {currentScreen === 'settings' && renderSettingsScreen()}
      {currentScreen === 'teacher' && renderTeacherDashboardScreen()}
      {currentScreen === 'teacher_schedule' && renderTeacherScheduleScreen()}
      {currentScreen === 'teacher_exams' && renderTeacherExamsScreen()}
      {currentScreen === 'teacher_ai' && renderTeacherAiScreen()}
      {currentScreen === 'admin_students' && renderAdminStudentsScreen()}
      {currentScreen === 'teacher_students' && renderTeacherStudentsScreen()}
      {currentScreen === 'student_timetable' && renderStudentTimetableScreen()}
      {currentScreen === 'student_checklist' && renderStudentChecklistScreen()}
      {currentScreen === 'student_exams' && renderStudentExamsScreen()}
      {currentScreen === 'student_materials' && renderStudentMaterialsScreen()}
      {currentScreen === 'student_marks' && renderStudentMarksScreen()}
      {currentScreen === 'attendance_hub' && renderAttendanceHubScreen()}
      {currentScreen === 'report_card' && renderReportCardScreen()}
      {/* ==========================================
          MODALS
         ========================================== */}

      {/* 1. Apply Leave Modal */}
      <Modal visible={leaveModalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setLeaveModalVisible(false)}
        >
          <View style={styles.modalBox}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalMainTitle}>Apply Student Leave</Text>
              <TouchableOpacity onPress={() => setLeaveModalVisible(false)}>
                <Ionicons name="close" size={22} color="#4A5568" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSubText}>Submit leave application for Aarav Sharma (Class 6-A).</Text>
            <View style={[styles.inputPillContainer, { marginTop: 12, height: 48 }]}>
              <TextInput
                style={styles.textInputField}
                placeholder="Reason (e.g. Doctor appointment, Fever)"
                placeholderTextColor="#7D899B"
                value={leaveReason}
                onChangeText={setLeaveReason}
              />
            </View>
            <TouchableOpacity
              style={[styles.loginSignInButton, { marginTop: 14 }]}
              onPress={() => {
                if (!leaveReason.trim()) {
                  showAlert('Required', 'Please enter a brief reason for leave.');
                  return;
                }
                setLeaveModalVisible(false);
                setLeaveReason('');
                showAlert('Leave Submitted', 'Application sent to Class Teacher Mrs. Anjali Sen.');
              }}
            >
              <Text style={styles.signInButtonText}>Submit Application</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 2. Fee Receipt & Transaction Details Modal */}
      <Modal visible={feeReceiptModalVisible || receiptDetailModalVisible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => {
            setFeeReceiptModalVisible(false);
            setReceiptDetailModalVisible(false);
          }}
        >
          <View style={[styles.modalBox, { width: 345, paddingHorizontal: 18 }]}>
            <View style={styles.modalHeaderRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="receipt" size={20} color="#10B981" style={{ marginRight: 6 }} />
                <Text style={styles.modalMainTitle}>Official Fee Receipt</Text>
              </View>
              <TouchableOpacity onPress={() => {
                setFeeReceiptModalVisible(false);
                setReceiptDetailModalVisible(false);
              }}>
                <Ionicons name="close" size={22} color="#4A5568" />
              </TouchableOpacity>
            </View>

            {/* Receipt Digital Card with Rupee formatting */}
            <View style={{ backgroundColor: '#F8FAFC', borderRadius: 14, padding: 14, marginTop: 12, borderWidth: 1, borderColor: '#E2E8F0' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View>
                  <Text style={{ fontSize: 13, fontWeight: '800', color: '#0F172A' }}>
                    {selectedReceiptTxn?.receiptNo || 'REC-2026-9041'}
                  </Text>
                  <Text style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
                    Txn ID: {selectedReceiptTxn?.txnId || 'TXN-901'}
                  </Text>
                </View>
                <View style={{ backgroundColor: '#ECFDF5', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 }}>
                  <Text style={{ fontSize: 11, fontWeight: '800', color: '#059669' }}>
                    ● {selectedReceiptTxn?.status || 'PAID'}
                  </Text>
                </View>
              </View>

              {/* Student Details */}
              <View style={{ borderTopWidth: 1, borderTopColor: '#E2E8F0', marginTop: 10, paddingTop: 8 }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: '#1E293B' }}>
                  {selectedReceiptTxn?.studentName || 'Aarav Sharma'}
                </Text>
                <Text style={{ fontSize: 11, color: '#64748B', marginTop: 1 }}>
                  Adm: {selectedReceiptTxn?.admissionNo || 'ADM-2024-001'} • {selectedReceiptTxn?.grade || 'Grade 6-A'}
                </Text>
                <Text style={{ fontSize: 11, color: '#64748B' }}>
                  Date: {selectedReceiptTxn?.date || '14 Oct 2026'} • Mode: {selectedReceiptTxn?.mode || 'UPI NetBanking'}
                </Text>
              </View>

              {/* Fee Component Breakdown */}
              <View style={{ borderTopWidth: 1, borderTopColor: '#E2E8F0', marginTop: 10, paddingTop: 8 }}>
                <Text style={{ fontSize: 10, fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', marginBottom: 4 }}>
                  FEE ITEMIZATION
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2 }}>
                  <Text style={{ fontSize: 12, color: '#475569' }}>Tuition Fee</Text>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: '#0F172A' }}>₹12,000</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2 }}>
                  <Text style={{ fontSize: 12, color: '#475569' }}>Computer & Science Lab</Text>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: '#0F172A' }}>₹2,500</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2 }}>
                  <Text style={{ fontSize: 12, color: '#475569' }}>Transport & Activity Fund</Text>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: '#0F172A' }}>₹2,000</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#CBD5E1', marginTop: 6, paddingTop: 6 }}>
                  <Text style={{ fontSize: 13, fontWeight: '800', color: '#0F172A' }}>Amount Remitted</Text>
                  <Text style={{ fontSize: 15, fontWeight: '900', color: '#10B981' }}>
                    ₹{(selectedReceiptTxn?.amount || 16500).toLocaleString('en-IN')}
                  </Text>
                </View>
              </View>

              {/* Outstanding Balance Note */}
              <View style={{ backgroundColor: '#EFF6FF', borderRadius: 8, padding: 8, marginTop: 10 }}>
                <Text style={{ fontSize: 11, color: '#1E40AF', fontWeight: '600' }}>
                  Remaining Student Balance: ₹{(selectedReceiptTxn?.pendingBalance !== undefined ? selectedReceiptTxn.pendingBalance : 4500).toLocaleString('en-IN')}
                </Text>
              </View>
            </View>

            {/* Receipt Actions */}
            <TouchableOpacity
              style={[styles.loginSignInButton, { marginTop: 14, backgroundColor: '#10B981' }]}
              onPress={() => {
                setFeeReceiptModalVisible(false);
                setReceiptDetailModalVisible(false);
                showAlert(
                  'Receipt Downloaded! 📄',
                  `Tax invoice ${selectedReceiptTxn?.receiptNo || 'REC-2026-9041'} generated with official school seal. Saved to Device Storage.`
                );
              }}
            >
              <Ionicons name="download-outline" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={styles.signInButtonText}>Download Tax Invoice (PDF)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.loginSignInButton, { marginTop: 8, backgroundColor: '#64748B' }]}
              onPress={() => {
                setFeeReceiptModalVisible(false);
                setReceiptDetailModalVisible(false);
              }}
            >
              <Text style={styles.signInButtonText}>Dismiss</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 3. Live GPS Map Modal */}
      <Modal visible={liveMapModalVisible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setLiveMapModalVisible(false)}
        >
          <View style={[styles.modalBox, { width: 340, padding: 18 }]}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalMainTitle}>Live GPS Satellite Map</Text>
              <TouchableOpacity onPress={() => setLiveMapModalVisible(false)}>
                <Ionicons name="close" size={22} color="#4A5568" />
              </TouchableOpacity>
            </View>
            {/* Vector Map Simulation Graphic */}
            <View style={styles.simulatedMapBox}>
              <Svg width="100%" height={160} viewBox="0 0 300 160">
                {/* Background terrain */}
                <Path d="M0 0 H300 V160 H0 Z" fill="#E2E8F0" />
                {/* Road paths */}
                <Path d="M20 140 Q100 120 140 80 T260 40" stroke="#FFFFFF" strokeWidth={18} fill="none" strokeLinecap="round" />
                <Path d="M20 140 Q100 120 140 80 T260 40" stroke="#3B82F6" strokeWidth={6} fill="none" strokeLinecap="round" strokeDasharray="6 4" />
                {/* Student Home icon */}
                <Circle cx="230" cy="50" r="10" fill="#EF4444" />
                {/* Bus marker */}
                <Circle cx="150" cy="76" r="14" fill="#10B981" />
                <Circle cx="150" cy="76" r="22" stroke="#10B981" strokeWidth="2" strokeOpacity={0.4} fill="none" />
              </Svg>
              <View style={styles.mapFloatingTag}>
                <Ionicons name="bus" size={14} color="#10B981" style={{ marginRight: 4 }} />
                <Text style={{ fontSize: 11, fontWeight: '700', color: '#065F46' }}>Bus 12 (6 mins away)</Text>
              </View>
            </View>
            <Text style={{ fontSize: 12, color: '#64748B', marginTop: 10, textAlign: 'center' }}>
              Real-time telemetry updated every 3 seconds via GPS.
            </Text>
            <TouchableOpacity
              style={[styles.loginSignInButton, { marginTop: 14 }]}
              onPress={() => setLiveMapModalVisible(false)}
            >
              <Text style={styles.signInButtonText}>Close Map</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 4. Call Driver Confirmation Modal */}
      <Modal visible={callModalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setCallModalVisible(false)}
        >
          <View style={styles.modalBox}>
            <View style={{ alignItems: 'center', marginVertical: 10 }}>
              <View style={[styles.trophyIconCircle, { backgroundColor: '#ECFDF5', width: 56, height: 56, borderRadius: 28 }]}>
                <Ionicons name="call" size={26} color="#10B981" />
              </View>
              <Text style={{ fontSize: 17, fontWeight: '700', color: '#0F172A', marginTop: 12 }}>Call Driver?</Text>
              <Text style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>Ramesh Kumar (Bus No. 12)</Text>
              <Text style={{ fontSize: 15, fontWeight: '800', color: '#2563EB', marginTop: 4 }}>+91 98234 56789</Text>
            </View>
            <TouchableOpacity
              style={[styles.loginSignInButton, { backgroundColor: '#10B981', marginTop: 12 }]}
              onPress={() => {
                setCallModalVisible(false);
                showAlert('Calling Driver', 'Connecting call to driver Ramesh Kumar on +91 98234 56789...');
              }}
            >
              <Text style={styles.signInButtonText}>Call Now</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 5. Student Profile Modal */}
      <Modal visible={profileModalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setProfileModalVisible(false)}
        >
          <View style={styles.modalBox}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalMainTitle}>Student Profile</Text>
              <TouchableOpacity onPress={() => setProfileModalVisible(false)}>
                <Ionicons name="close" size={22} color="#4A5568" />
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', marginVertical: 14 }}>
              <StudentAvatar />
              <Text style={{ fontSize: 17, fontWeight: '700', color: '#0F172A', marginTop: 10 }}>Aarav Sharma</Text>
              <Text style={{ fontSize: 13, color: '#2563EB', fontWeight: '600' }}>Class 6-A • Roll No. 14</Text>
            </View>
            <View style={{ borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 12 }}>
              <Text style={{ fontSize: 13, color: '#64748B' }}>Parent Name: Priya Sharma</Text>
              <Text style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>Blood Group: B+</Text>
              <Text style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>Emergency Contact: +91 98765 43210</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 6. Notifications Modal */}
      <Modal visible={notificationModalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setNotificationModalVisible(false)}
        >
          <View style={styles.modalBox}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalMainTitle}>Notifications</Text>
              <TouchableOpacity onPress={() => setNotificationModalVisible(false)}>
                <Ionicons name="close" size={22} color="#4A5568" />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 14 }}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#1E293B' }}>🎉 Sports Day on 24 May!</Text>
              <Text style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>Annual sports registration is now open.</Text>
            </View>
            <View style={{ marginTop: 14 }}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#1E293B' }}>🚌 Bus Route Update</Text>
              <Text style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>Route 12 will arrive 5 mins early tomorrow.</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 7. Polished A4 Report Card Preview Modal (Print & PDF) */}
      <Modal visible={reportCardModalVisible || a4ReportPreviewVisible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => {
            setReportCardModalVisible(false);
            setA4ReportPreviewVisible(false);
          }}
        >
          <View style={[styles.modalBox, { width: 360, maxHeight: '92%', paddingHorizontal: 16 }]}>
            {/* Modal Header */}
            <View style={styles.modalHeaderRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="document-text" size={20} color="#1E3A8A" style={{ marginRight: 6 }} />
                <Text style={styles.modalMainTitle}>A4 Official Report Card</Text>
              </View>
              <TouchableOpacity onPress={() => {
                setReportCardModalVisible(false);
                setA4ReportPreviewVisible(false);
              }}>
                <Ionicons name="close" size={22} color="#4A5568" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ marginVertical: 10 }}>
              {/* Dynamic Student and Report Data Resolution */}
              {(() => {
                const activeId = selectedStudentForReport?.id || (userRole === 'parent' ? (parentSelectedChild === 'Rita Sharma' ? 4 : 1) : 1);
                const a4Data = studentReportCardData[activeId] || studentReportCardData[1];
                const activeRemarks = reportCardTeacherRemarks[activeId] || reportCardTeacherRemarks[1];

                return (
                  <View
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 12,
                      padding: 16,
                      borderWidth: 2,
                      borderColor: '#1E3A8A',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.1,
                      shadowRadius: 8,
                    }}
                  >
                    {/* School Letterhead */}
                    <View style={{ alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#1E3A8A', paddingBottom: 10 }}>
                      <Text style={{ fontSize: 16, fontWeight: '900', color: '#1E3A8A', letterSpacing: 1 }}>
                        EDUSPHERE INTERNATIONAL ACADEMY
                      </Text>
                      <Text style={{ fontSize: 10, color: '#64748B', marginTop: 1 }}>
                        Affiliated to Central Board of Education • Code: SCH-9082
                      </Text>
                      <Text style={{ fontSize: 12, fontWeight: '800', color: '#0F172A', marginTop: 6, textTransform: 'uppercase' }}>
                        ACADEMIC PROGRESS REPORT (2023-2024)
                      </Text>
                      <View style={{ backgroundColor: '#1E3A8A', paddingHorizontal: 10, paddingVertical: 2, borderRadius: 6, marginTop: 4 }}>
                        <Text style={{ fontSize: 10, fontWeight: '800', color: '#FFFFFF' }}>{reportCardTerm.toUpperCase()}</Text>
                      </View>
                    </View>

                    {/* Student Bio Grid */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' }}>
                      <View>
                        <Text style={{ fontSize: 11, color: '#64748B' }}>Student Name:</Text>
                        <Text style={{ fontSize: 13, fontWeight: '800', color: '#0F172A' }}>
                          {a4Data.studentName}
                        </Text>
                        <Text style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>Admission No:</Text>
                        <Text style={{ fontSize: 12, fontWeight: '700', color: '#1E3A8A' }}>
                          {a4Data.admissionNo}
                        </Text>
                      </View>
                      <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 11, color: '#64748B' }}>Class & Section:</Text>
                        <Text style={{ fontSize: 13, fontWeight: '800', color: '#0F172A' }}>
                          {a4Data.grade}
                        </Text>
                        <Text style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>Roll No / Examination:</Text>
                        <Text style={{ fontSize: 12, fontWeight: '700', color: '#0F172A' }}>
                          Roll #{a4Data.roll} • {a4Data.examName}
                        </Text>
                      </View>
                    </View>

                    {/* Subject Marks Table */}
                    <View style={{ marginTop: 10 }}>
                      <View style={{ flexDirection: 'row', backgroundColor: '#F1F5F9', paddingVertical: 6, paddingHorizontal: 6, borderRadius: 6 }}>
                        <Text style={{ flex: 2, fontSize: 10, fontWeight: '800', color: '#334155' }}>SUBJECT</Text>
                        <Text style={{ flex: 1, fontSize: 10, fontWeight: '800', color: '#334155', textAlign: 'center' }}>MAX</Text>
                        <Text style={{ flex: 1, fontSize: 10, fontWeight: '800', color: '#334155', textAlign: 'center' }}>OBT</Text>
                        <Text style={{ flex: 1, fontSize: 10, fontWeight: '800', color: '#334155', textAlign: 'right' }}>GRADE</Text>
                      </View>

                      {a4Data.subjects.map((row, idx) => (
                        <View key={idx} style={{ flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 6, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' }}>
                          <Text style={{ flex: 2, fontSize: 11, fontWeight: '600', color: '#0F172A' }}>{row.name}</Text>
                          <Text style={{ flex: 1, fontSize: 11, color: '#64748B', textAlign: 'center' }}>{row.score.split('/')[1]}</Text>
                          <Text style={{ flex: 1, fontSize: 11, fontWeight: '700', color: '#0F172A', textAlign: 'center' }}>{row.score.split('/')[0]}</Text>
                          <Text style={{ flex: 1, fontSize: 11, fontWeight: '800', color: row.color, textAlign: 'right' }}>{row.grade}</Text>
                        </View>
                      ))}

                      {/* Table Totals Row */}
                      <View style={{ flexDirection: 'row', backgroundColor: '#EFF6FF', paddingVertical: 6, paddingHorizontal: 6, borderRadius: 6, marginTop: 4 }}>
                        <Text style={{ flex: 2, fontSize: 11, fontWeight: '800', color: '#1E3A8A' }}>TOTAL AGGREGATE</Text>
                        <Text style={{ flex: 1, fontSize: 11, fontWeight: '800', color: '#1E3A8A', textAlign: 'center' }}>{a4Data.maxMarks}</Text>
                        <Text style={{ flex: 1, fontSize: 11, fontWeight: '900', color: '#1E3A8A', textAlign: 'center' }}>{a4Data.obtainedMarks}</Text>
                        <Text style={{ flex: 1, fontSize: 11, fontWeight: '900', color: '#1E3A8A', textAlign: 'right' }}>{a4Data.overallPct}%</Text>
                      </View>
                    </View>

                    {/* Performance Summary Grid */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, backgroundColor: '#F8FAFC', padding: 8, borderRadius: 8 }}>
                      <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 9, color: '#64748B', fontWeight: '700' }}>PERCENTAGE</Text>
                        <Text style={{ fontSize: 13, fontWeight: '900', color: '#1E3A8A', marginTop: 2 }}>{a4Data.overallPct}%</Text>
                      </View>
                      <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 9, color: '#64748B', fontWeight: '700' }}>FINAL GRADE</Text>
                        <Text style={{ fontSize: 13, fontWeight: '900', color: '#D97706', marginTop: 2 }}>{a4Data.gradeAwarded}</Text>
                      </View>
                      <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 9, color: '#64748B', fontWeight: '700' }}>CLASS RANK</Text>
                        <Text style={{ fontSize: 13, fontWeight: '900', color: '#059669', marginTop: 2 }}>{a4Data.rank}</Text>
                      </View>
                      <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 9, color: '#64748B', fontWeight: '700' }}>RESULT</Text>
                        <Text style={{ fontSize: 13, fontWeight: '900', color: '#10B981', marginTop: 2 }}>{a4Data.result}</Text>
                      </View>
                    </View>

                    {/* Teacher Remarks in A4 Preview */}
                    <View style={{ marginTop: 10, padding: 8, backgroundColor: '#FEFCE8', borderRadius: 8, borderWidth: 1, borderColor: '#FEF08A' }}>
                      <Text style={{ fontSize: 9, fontWeight: '800', color: '#854D0E', textTransform: 'uppercase' }}>
                        FACULTY EVALUATION & TEACHER REMARKS:
                      </Text>
                      <Text style={{ fontSize: 11, color: '#713F12', marginTop: 2, fontStyle: 'italic', lineHeight: 15 }}>
                        "{activeRemarks}"
                      </Text>
                    </View>

                    {/* Official Signatures Row */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 18, paddingTop: 14, borderTopWidth: 1, borderTopColor: '#CBD5E1' }}>
                      <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 11, fontStyle: 'italic', color: '#2563EB', fontWeight: '700' }}>Sarah Jenkins</Text>
                        <Text style={{ fontSize: 9, color: '#64748B', marginTop: 2 }}>Class Teacher</Text>
                      </View>
                      <View style={{ alignItems: 'center' }}>
                        <View style={{ width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: '#1E3A8A', alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ fontSize: 8, fontWeight: '900', color: '#1E3A8A' }}>SEAL</Text>
                        </View>
                        <Text style={{ fontSize: 9, color: '#64748B', marginTop: 2 }}>School Seal</Text>
                      </View>
                      <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 11, fontStyle: 'italic', color: '#0F172A', fontWeight: '700' }}>Dr. Rajesh K.</Text>
                        <Text style={{ fontSize: 9, color: '#64748B', marginTop: 2 }}>Principal</Text>
                      </View>
                    </View>
                  </View>
                );
              })()}
            </ScrollView>

            {/* A4 Dialog Actions */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8, marginTop: 10 }}>
              <TouchableOpacity
                style={[styles.loginSignInButton, { flex: 1, backgroundColor: '#059669', marginTop: 0 }]}
                onPress={() => {
                  showAlert('PDF Generated! 📄', 'Report Card has been compiled into official PDF format with high-resolution vector assets and saved to your device.');
                }}
              >
                <Ionicons name="download-outline" size={17} color="#FFFFFF" style={{ marginRight: 4 }} />
                <Text style={styles.signInButtonText}>Generate PDF</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.loginSignInButton, { flex: 1, backgroundColor: '#1E3A8A', marginTop: 0 }]}
                onPress={() => {
                  showAlert('Print Job Sent 🖨️', 'Document sent to campus AirPrint / Google Cloud Print. Ready for pickup.');
                }}
              >
                <Ionicons name="print-outline" size={17} color="#FFFFFF" style={{ marginRight: 4 }} />
                <Text style={styles.signInButtonText}>Print A4</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.loginSignInButton, { backgroundColor: '#64748B', marginTop: 8, paddingVertical: 8 }]}
              onPress={() => {
                setReportCardModalVisible(false);
                setA4ReportPreviewVisible(false);
              }}
            >
              <Text style={styles.signInButtonText}>Close Preview</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 8. Language Selection Modal */}
      <Modal visible={langModalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setLangModalVisible(false)}
        >
          <View style={styles.modalBox}>
            <Text style={styles.modalMainTitle}>Choose Language</Text>
            {LANGUAGES.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageOptionRow,
                  selectedLang === lang.code && styles.languageOptionSelected,
                ]}
                onPress={() => {
                  setSelectedLang(lang.code);
                  setLangModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.languageOptionText,
                    selectedLang === lang.code && styles.languageOptionTextActive,
                  ]}
                >
                  {lang.name} ({lang.code})
                </Text>
                {selectedLang === lang.code && (
                  <Ionicons name="checkmark" size={20} color="#00A7CB" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 9. Quick PIN Dialpad Modal */}
      <Modal visible={dialpadModalVisible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setDialpadModalVisible(false)}
        >
          <View style={[styles.modalBox, { width: 320, paddingBottom: 24 }]}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalMainTitle}>Quick PIN Login</Text>
              <TouchableOpacity onPress={() => setDialpadModalVisible(false)}>
                <Ionicons name="close" size={22} color="#4A5568" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSubText}>Enter your 4-digit PIN to sign in</Text>

            <View style={styles.pinIndicatorsRow}>
              {[0, 1, 2, 3].map((idx) => (
                <View
                  key={idx}
                  style={[
                    styles.pinDotCircle,
                    pinCode.length > idx && styles.pinDotCircleFilled,
                  ]}
                />
              ))}
            </View>

            <View style={styles.pinKeypadGrid}>
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'].map(
                (key, index) => {
                  if (key === '') {
                    return <View key={index} style={styles.keypadKeyBlank} />;
                  }
                  if (key === 'del') {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.keypadKeyBtn}
                        onPress={handlePinBackspace}
                      >
                        <Ionicons name="backspace-outline" size={22} color="#1A202C" />
                      </TouchableOpacity>
                    );
                  }
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.keypadKeyBtn}
                      onPress={() => handlePinPress(key)}
                    >
                      <Text style={styles.keypadKeyNumber}>{key}</Text>
                    </TouchableOpacity>
                  );
                },
              )}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 10. Forgot Password Modal */}
      <Modal visible={forgotModalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setForgotModalVisible(false)}
        >
          <View style={styles.modalBox}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalMainTitle}>Reset Password</Text>
              <TouchableOpacity onPress={() => setForgotModalVisible(false)}>
                <Ionicons name="close" size={22} color="#4A5568" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSubText}>
              Enter your student or staff email address.
            </Text>

            <View style={[styles.inputPillContainer, { marginTop: 14 }]}>
              <TextInput
                style={styles.textInputField}
                placeholder="name@school.edu"
                placeholderTextColor="#7D899B"
                value={forgotEmail}
                onChangeText={setForgotEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              style={[styles.loginSignInButton, { marginTop: 16 }]}
              onPress={handleForgotPassword}
            >
              <Text style={styles.signInButtonText}>Send Reset Link</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 11. Privacy Policy Modal */}
      <Modal visible={privacyModalVisible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setPrivacyModalVisible(false)}
        >
          <View style={[styles.modalBox, { maxHeight: '75%', width: 340 }]}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalMainTitle}>Privacy Policy</Text>
              <TouchableOpacity onPress={() => setPrivacyModalVisible(false)}>
                <Ionicons name="close" size={22} color="#4A5568" />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 12 }}>
              <Text style={styles.privacyContentText}>
                Schoolbook respects your privacy. All student information, grades,
                and attendance records are strictly confidential and protected under institutional security rules.
              </Text>
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 12. Teacher Mark Attendance Modal */}
      <Modal visible={teacherAttendanceModal} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setTeacherAttendanceModal(false)}
        >
          <View style={[styles.modalBox, { width: 350, maxHeight: '80%' }]}>
            <View style={styles.modalHeaderRow}>
              <View>
                <Text style={styles.modalMainTitle}>Grade 6-A Attendance</Text>
                <Text style={{ fontSize: 12, color: '#64748B' }}>Today: 14 Feb 2026 • Room 204</Text>
              </View>
              <TouchableOpacity onPress={() => setTeacherAttendanceModal(false)}>
                <Ionicons name="close" size={22} color="#4A5568" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ marginVertical: 12 }}>
              {teacherStudentsList.map((st) => (
                <View key={st.id} style={styles.teacherStudentAttendRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#0F172A' }}>
                      #{st.roll} • {st.name}
                    </Text>
                    <Text style={{ fontSize: 12, color: '#64748B' }}>{st.class}</Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.teacherAttendToggleBtn,
                      st.present ? styles.teacherAttendBtnPresent : styles.teacherAttendBtnAbsent,
                    ]}
                    onPress={() => {
                      setTeacherStudentsList((prev) =>
                        prev.map((s) => (s.id === st.id ? { ...s, present: !s.present } : s))
                      );
                    }}
                  >
                    <Ionicons
                      name={st.present ? "checkmark-circle" : "close-circle"}
                      size={16}
                      color={st.present ? "#059669" : "#DC2626"}
                      style={{ marginRight: 4 }}
                    />
                    <Text
                      style={[
                        styles.teacherAttendToggleText,
                        st.present ? { color: '#059669' } : { color: '#DC2626' },
                      ]}
                    >
                      {st.present ? 'Present' : 'Absent'}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={[styles.loginSignInButton, { backgroundColor: '#2E798A', marginTop: 8 }]}
              onPress={() => {
                setIsAttendanceMarkedToday(true);
                setTeacherAttendanceModal(false);
                showAlert('Attendance Saved', 'Daily attendance for Grade 6-A has been synced with the school portal.');
              }}
            >
              <Text style={styles.signInButtonText}>Confirm & Submit Attendance</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 13. Teacher Add Homework Modal */}
      <Modal visible={teacherHomeworkModal} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setTeacherHomeworkModal(false)}
        >
          <View style={[styles.modalBox, { width: 330 }]}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalMainTitle}>Assign Homework</Text>
              <TouchableOpacity onPress={() => setTeacherHomeworkModal(false)}>
                <Ionicons name="close" size={22} color="#4A5568" />
              </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>
              Class: {teacherHomeworkSubject}
            </Text>

            <View style={[styles.inputPillContainer, { marginTop: 14 }]}>
              <TextInput
                style={styles.textInputField}
                placeholder="Homework topic or exercise..."
                placeholderTextColor="#94A3B8"
                value={teacherHomeworkTitle}
                onChangeText={setTeacherHomeworkTitle}
              />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <TouchableOpacity
                style={[styles.settingsEditBadge, { flex: 1, marginRight: 6, alignItems: 'center' }]}
                onPress={() => setTeacherHomeworkSubject('Mathematics 6-A')}
              >
                <Text style={styles.settingsEditBadgeText}>Maths 6-A</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.settingsEditBadge, { flex: 1, marginLeft: 6, alignItems: 'center' }]}
                onPress={() => setTeacherHomeworkSubject('Calculus 10-A')}
              >
                <Text style={styles.settingsEditBadgeText}>Calculus 10-A</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.loginSignInButton, { backgroundColor: '#38BDF8', marginTop: 18 }]}
              onPress={() => {
                if (!teacherHomeworkTitle.trim()) {
                  showAlert('Required', 'Please enter a description of the assignment.');
                  return;
                }
                setTeacherHomeworkModal(false);
                setTeacherHomeworkTitle('');
                showAlert('Homework Broadcasted', 'Assignment posted to all student and parent portals.');
              }}
            >
              <Text style={styles.signInButtonText}>Publish Assignment</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 14. Teacher Enter Marks Modal */}
      <Modal visible={teacherMarksModal} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setTeacherMarksModal(false)}
        >
          <View style={[styles.modalBox, { width: 350, maxHeight: '80%' }]}>
            <View style={styles.modalHeaderRow}>
              <View>
                <Text style={styles.modalMainTitle}>Enter Exam Marks</Text>
                <Text style={{ fontSize: 12, color: '#64748B' }}>Unit Test 1 • Mathematics</Text>
              </View>
              <TouchableOpacity onPress={() => setTeacherMarksModal(false)}>
                <Ionicons name="close" size={22} color="#4A5568" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ marginVertical: 12 }}>
              {teacherStudentsList.map((st) => (
                <View key={st.id} style={styles.teacherStudentAttendRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#0F172A' }}>
                      #{st.roll} {st.name}
                    </Text>
                    <Text style={{ fontSize: 11, color: '#94A3B8' }}>Max Marks: 100</Text>
                  </View>
                  <View style={styles.teacherMarksInputBox}>
                    <TextInput
                      style={styles.teacherMarksInputText}
                      placeholder={st.marks.split('/')[0]}
                      placeholderTextColor="#94A3B8"
                      keyboardType="numeric"
                      maxLength={3}
                      onChangeText={(val) => {
                        setTeacherMarksInput((prev) => ({ ...prev, [st.id]: val }));
                      }}
                    />
                    <Text style={{ fontSize: 12, color: '#64748B', fontWeight: '700' }}>/100</Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={[styles.loginSignInButton, { backgroundColor: '#2563EB', marginTop: 8 }]}
              onPress={() => {
                setTeacherMarksModal(false);
                showAlert('Marks Uploaded', 'Grades submitted to the examination records office.');
              }}
            >
              <Text style={styles.signInButtonText}>Save & Publish Marks</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 15. Teacher View Students Directory Modal */}
      <Modal visible={teacherStudentsModal} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setTeacherStudentsModal(false)}
        >
          <View style={[styles.modalBox, { width: 350, maxHeight: '82%' }]}>
            <View style={styles.modalHeaderRow}>
              <View>
                <Text style={styles.modalMainTitle}>Grade 6-A Students</Text>
                <Text style={{ fontSize: 12, color: '#64748B' }}>Total: 40 Enrolled • 38 Present</Text>
              </View>
              <TouchableOpacity onPress={() => setTeacherStudentsModal(false)}>
                <Ionicons name="close" size={22} color="#4A5568" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ marginVertical: 12 }}>
              {teacherStudentsList.map((st) => (
                <TouchableOpacity
                  key={st.id}
                  style={styles.teacherStudentCardItem}
                  onPress={() => {
                    showAlert(st.name, `Roll: ${st.roll}\nClass: ${st.class}\nLatest Score: ${st.marks}\nAttendance: 96%`);
                  }}
                >
                  <View style={styles.teacherStudentAvatarWrap}>
                    <Text style={styles.teacherStudentAvatarLetter}>{st.name[0]}</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#0F172A' }}>{st.name}</Text>
                    <Text style={{ fontSize: 12, color: '#64748B' }}>Roll #{st.roll} • Grade 6-A</Text>
                  </View>
                  <View style={[styles.teacherStatusBadge, st.present ? { backgroundColor: '#ECFDF5' } : { backgroundColor: '#FEF2F2' }]}>
                    <Text style={[styles.teacherStatusBadgeText, st.present ? { color: '#059669' } : { color: '#DC2626' }]}>
                      {st.marks}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={[styles.loginSignInButton, { backgroundColor: '#F59E0B' }]}
              onPress={() => setTeacherStudentsModal(false)}
            >
              <Text style={styles.signInButtonText}>Close Student List</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 16. Teacher Add Meeting Modal */}
      <Modal visible={teacherMeetingModal} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setTeacherMeetingModal(false)}
        >
          <View style={[styles.modalBox, { width: 330 }]}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalMainTitle}>Schedule Class Meeting</Text>
              <TouchableOpacity onPress={() => setTeacherMeetingModal(false)}>
                <Ionicons name="close" size={22} color="#4A5568" />
              </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 13, color: '#64748B', marginTop: 8 }}>
              Host virtual parent-teacher meeting or online live lecture for Grade 6-A.
            </Text>

            <View style={{ backgroundColor: '#F8FAFC', padding: 14, borderRadius: 14, marginTop: 12 }}>
              <Text style={{ fontSize: 13, fontWeight: '700', color: '#0F172A' }}>📹 HD Video Room Ready</Text>
              <Text style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>Meeting Code: SCH-6A-LIVE</Text>
              <Text style={{ fontSize: 12, color: '#2563EB', marginTop: 2 }}>Secure Link Generated</Text>
            </View>

            <TouchableOpacity
              style={[styles.loginSignInButton, { backgroundColor: '#EF4444', marginTop: 16 }]}
              onPress={() => {
                setTeacherMeetingModal(false);
                setIsMeetingScheduled(true);
                showAlert('Meeting Live', 'Virtual classroom broadcast link sent to Grade 6-A parents and students.');
              }}
            >
              <Text style={styles.signInButtonText}>Start Online Meeting</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 17. Teacher Drawer Modal */}
      <Modal visible={teacherDrawerModal} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setTeacherDrawerModal(false)}
        >
          <View style={[styles.modalBox, { width: 300, alignSelf: 'flex-start', marginLeft: 20 }]}>
            <View style={styles.modalHeaderRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="school" size={22} color="#2E798A" style={{ marginRight: 8 }} />
                <Text style={styles.modalMainTitle}>Faculty Portal</Text>
              </View>
              <TouchableOpacity onPress={() => setTeacherDrawerModal(false)}>
                <Ionicons name="close" size={22} color="#4A5568" />
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 14 }}>
              {[
                { title: 'Teacher Dashboard', screen: 'teacher', allowed: ['teacher', 'admin'] },
                { title: 'Teaching Schedule', screen: 'teacher_schedule', allowed: ['teacher', 'admin'] },
                { title: 'Exams & Marks Entry', screen: 'teacher_exams', allowed: ['teacher', 'admin'] },
                { title: 'Ask AI Copilot', screen: 'teacher_ai', allowed: ['teacher', 'admin'] },
                { title: 'School Administration', screen: 'edusphere_admin', allowed: ['admin'] },
                { title: 'Notifications Center', screen: 'notifications', allowed: ['teacher', 'admin'] },
                { title: 'Account Settings', screen: 'settings', allowed: ['teacher', 'admin'] },
              ]
                .filter(item => item.allowed.includes(userRole))
                .map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.teacherDrawerItem}
                    onPress={() => {
                      setTeacherDrawerModal(false);
                      setCurrentScreen(item.screen);
                    }}
                  >
                    <Text style={styles.teacherDrawerItemText}>{item.title}</Text>
                    <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                  </TouchableOpacity>
                ))}

              {/* Direct Sign Out in Faculty Drawer */}
              <TouchableOpacity
                style={[styles.teacherDrawerItem, { borderBottomWidth: 0, marginTop: 8 }]}
                onPress={() => {
                  setTeacherDrawerModal(false);
                  showAlert('Signed Out', 'You have been successfully signed out.');
                  setCurrentScreen('login');
                  setUsername(ROLE_CONFIGS[userRole].defaultUser);
                  setPassword(ROLE_CONFIGS[userRole].defaultPass);
                }}
              >
                <Text style={[styles.teacherDrawerItemText, { color: '#DC2626', fontWeight: '700' }]}>Sign Out</Text>
                <Ionicons name="log-out-outline" size={18} color="#DC2626" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 18. Admin Broadcast Announcement Modal */}
      <Modal visible={adminBroadcastModal} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setAdminBroadcastModal(false)}
        >
          <View style={[styles.modalBox, { width: 340 }]}>
            <View style={styles.modalHeaderRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="megaphone" size={22} color="#2563EB" style={{ marginRight: 8 }} />
                <Text style={styles.modalMainTitle}>School-Wide Circular</Text>
              </View>
              <TouchableOpacity onPress={() => setAdminBroadcastModal(false)}>
                <Ionicons name="close" size={22} color="#4A5568" />
              </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 13, color: '#64748B', marginTop: 8 }}>
              Broadcast instant push notification & SMS alert to all parents, students, and faculty.
            </Text>

            <View style={[styles.inputPillContainer, { marginTop: 14, height: 50 }]}>
              <TextInput
                style={styles.textInputField}
                placeholder="Announcement headline..."
                placeholderTextColor="#94A3B8"
                value={adminBroadcastText}
                onChangeText={setAdminBroadcastText}
              />
            </View>

            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              {['All Campus', 'Parents Only', 'Teachers'].map((t, idx) => (
                <View
                  key={idx}
                  style={{
                    backgroundColor: idx === 0 ? '#EFF6FF' : '#F1F5F9',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 12,
                    marginRight: 6,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: '700',
                      color: idx === 0 ? '#2563EB' : '#64748B',
                    }}
                  >
                    {t}
                  </Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.loginSignInButton, { backgroundColor: '#2563EB', marginTop: 16 }]}
              onPress={() => {
                if (!adminBroadcastText.trim()) {
                  showAlert('Required', 'Please enter a circular message to broadcast.');
                  return;
                }
                setAdminBroadcastModal(false);
                setAdminBroadcastText('');
                showAlert('Announcement Published', 'Push notification broadcasted to all 1,420 students and 86 faculty members.');
              }}
            >
              <Text style={styles.signInButtonText}>Send School Broadcast</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 18-B. Parent Drawer & Account Modal */}
      <Modal visible={parentDrawerModal} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setParentDrawerModal(false)}
        >
          <View style={[styles.modalBox, { width: 310, alignSelf: 'flex-start', marginLeft: 20 }]}>
            {/* Drawer Header */}
            <View style={styles.modalHeaderRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                  <Ionicons name="people" size={20} color="#1D4ED8" />
                </View>
                <View>
                  <Text style={[styles.modalMainTitle, { fontSize: 16 }]}>Parent Portal</Text>
                  <Text style={{ fontSize: 11, color: '#64748B' }}>Madhuri Sharma</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setParentDrawerModal(false)} style={{ padding: 4 }}>
                <Ionicons name="close" size={22} color="#4A5568" />
              </TouchableOpacity>
            </View>

            {/* Quick Children Switcher Card */}
            <View style={{ backgroundColor: '#F8FAFC', borderRadius: 12, padding: 10, marginTop: 12, borderWidth: 1, borderColor: '#E2E8F0' }}>
              <Text style={{ fontSize: 10, fontWeight: '800', color: '#64748B', textTransform: 'uppercase', marginBottom: 6 }}>
                CONNECTED CHILDREN
              </Text>
              <View style={{ flexDirection: 'row', gap: 6 }}>
                {['Rita Sharma', 'Rohan Sharma', 'Jyoti Sharma'].map((childName) => {
                  const isSelected = parentSelectedChild === childName;
                  return (
                    <TouchableOpacity
                      key={childName}
                      style={{
                        flex: 1,
                        backgroundColor: isSelected ? '#1D4ED8' : '#FFFFFF',
                        paddingVertical: 6,
                        paddingHorizontal: 4,
                        borderRadius: 8,
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: isSelected ? '#1D4ED8' : '#CBD5E1',
                      }}
                      onPress={() => {
                        setParentSelectedChild(childName);
                      }}
                    >
                      <Text style={{ fontSize: 10, fontWeight: '800', color: isSelected ? '#FFFFFF' : '#1E293B' }} numberOfLines={1}>
                        {childName.split(' ')[0]}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Navigation Drawer Menu Items */}
            <View style={{ marginTop: 12 }}>
              {[
                {
                  title: 'Home Dashboard',
                  icon: 'home-outline',
                  color: '#2563EB',
                  action: () => {
                    setParentDrawerModal(false);
                    setParentSubScreen('home');
                    setParentActiveTab('Home');
                  },
                },
                {
                  title: 'Daily Diary & Feed',
                  icon: 'book-outline',
                  color: '#059669',
                  action: () => {
                    setParentDrawerModal(false);
                    setParentSubScreen('feed');
                    setParentActiveTab('Diary');
                  },
                },
                {
                  title: 'Attendance Calendar',
                  icon: 'calendar-outline',
                  color: '#D97706',
                  action: () => {
                    setParentDrawerModal(false);
                    setParentSubScreen('attendance');
                    setParentActiveTab('Calendar');
                  },
                },
                {
                  title: 'Academic Report Card',
                  icon: 'ribbon-outline',
                  color: '#7C3AED',
                  action: () => {
                    setParentDrawerModal(false);
                    const matched = masterStudentsList.find((s) => s.name === parentSelectedChild) || masterStudentsList[3];
                    setSelectedStudentForReport(matched);
                    setCurrentScreen('report_card');
                  },
                },
                {
                  title: 'School Notice Board',
                  icon: 'megaphone-outline',
                  color: '#EA580C',
                  action: () => {
                    setParentDrawerModal(false);
                    setParentNoticeModal(true);
                  },
                },
                {
                  title: 'Fee Receipts & Ledger',
                  icon: 'card-outline',
                  color: '#0284C7',
                  action: () => {
                    setParentDrawerModal(false);
                    const matchedLedger = studentFeeLedger.find((s) => s.studentName.toLowerCase().includes(parentSelectedChild.toLowerCase().split(' ')[0])) || studentFeeLedger[0];
                    setSelectedReceiptTxn({
                      receiptNo: matchedLedger.receiptNo,
                      txnId: matchedLedger.paymentHistory[matchedLedger.paymentHistory.length - 1]?.txnId || 'TXN-904',
                      studentName: matchedLedger.studentName,
                      admissionNo: matchedLedger.admissionNo,
                      grade: matchedLedger.grade,
                      term: 'Term 2 Tuition & Activities',
                      amount: matchedLedger.paidAmount,
                      date: matchedLedger.lastPaymentDate,
                      mode: 'UPI NetBanking',
                      status: matchedLedger.status === 'Paid' ? 'PAID' : 'PENDING',
                      pendingBalance: matchedLedger.pendingBalance,
                      totalFee: matchedLedger.totalFee,
                    });
                    setReceiptDetailModalVisible(true);
                  },
                },
                {
                  title: 'Notifications Center',
                  icon: 'notifications-outline',
                  color: '#475569',
                  action: () => {
                    setParentDrawerModal(false);
                    setCurrentScreen('notifications');
                  },
                },
              ].map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.teacherDrawerItem}
                  onPress={item.action}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name={item.icon} size={18} color={item.color} style={{ marginRight: 10 }} />
                    <Text style={styles.teacherDrawerItemText}>{item.title}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                </TouchableOpacity>
              ))}

              {/* Direct Sign Out in Parent Drawer */}
              <TouchableOpacity
                style={[
                  styles.teacherDrawerItem,
                  {
                    borderBottomWidth: 0,
                    marginTop: 10,
                    backgroundColor: '#FEF2F2',
                    borderRadius: 10,
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                  },
                ]}
                onPress={() => {
                  setParentDrawerModal(false);
                  showAlert('Signed Out', 'You have been successfully signed out from the Parent Portal.');
                  setCurrentScreen('login');
                  setUsername(ROLE_CONFIGS.parent.defaultUser);
                  setPassword(ROLE_CONFIGS.parent.defaultPass);
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="log-out-outline" size={18} color="#DC2626" style={{ marginRight: 10 }} />
                  <Text style={[styles.teacherDrawerItemText, { color: '#DC2626', fontWeight: '800' }]}>Sign Out</Text>
                </View>
                <Ionicons name="arrow-forward" size={16} color="#DC2626" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 19. Parent Notice Board Modal */}
      <Modal visible={parentNoticeModal} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setParentNoticeModal(false)}
        >
          <View style={[styles.modalBox, { width: 340 }]}>
            <View style={styles.modalHeaderRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="megaphone-outline" size={22} color="#1D4ED8" style={{ marginRight: 8 }} />
                <Text style={styles.modalMainTitle}>School Notice Board</Text>
              </View>
              <TouchableOpacity onPress={() => setParentNoticeModal(false)}>
                <Ionicons name="close" size={22} color="#4A5568" />
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 14 }}>
              <View style={{ backgroundColor: '#EFF6FF', borderRadius: 12, padding: 12, marginBottom: 10 }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: '#1D4ED8' }}>Early Dismissal on Friday</Text>
                <Text style={{ fontSize: 12, color: '#334155', marginTop: 4, lineHeight: 16 }}>
                  School will close at 1:30 PM this Friday due to the Inter-School Sports preparation. School buses will depart early accordingly.
                </Text>
                <Text style={{ fontSize: 10, color: '#64748B', marginTop: 6 }}>📅 28 Aug 2019 • Principal's Office</Text>
              </View>

              <View style={{ backgroundColor: '#F8FAFC', borderRadius: 12, padding: 12 }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: '#0F172A' }}>Annual Science & Craft Exhibition</Text>
                <Text style={{ fontSize: 12, color: '#475569', marginTop: 4, lineHeight: 16 }}>
                  Parents are cordially invited to attend the junior school project exhibition on 15th September.
                </Text>
                <Text style={{ fontSize: 10, color: '#94A3B8', marginTop: 6 }}>📅 25 Aug 2019 • Academic Council</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.loginSignInButton, { backgroundColor: '#1D4ED8', marginTop: 16 }]}
              onPress={() => setParentNoticeModal(false)}
            >
              <Text style={styles.signInButtonText}>Acknowledge & Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 20. Student Detail Profile & Record Modal (Used across Student, Teacher, Admin, Parent) */}
      <Modal visible={studentDetailModalVisible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setStudentDetailModalVisible(false)}
        >
          <View style={[styles.modalBox, { width: 350, maxHeight: '88%', paddingHorizontal: 18 }]}>
            <View style={styles.modalHeaderRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="school" size={20} color="#2563EB" style={{ marginRight: 6 }} />
                <Text style={styles.modalMainTitle}>Student Profile & Records</Text>
              </View>
              <TouchableOpacity onPress={() => setStudentDetailModalVisible(false)}>
                <Ionicons name="close" size={22} color="#4A5568" />
              </TouchableOpacity>
            </View>

            {selectedStudentForDetail && (
              <ScrollView showsVerticalScrollIndicator={false} style={{ marginVertical: 12 }}>
                {/* Header Identity Card */}
                <View style={{ alignItems: 'center', backgroundColor: '#F8FAFC', padding: 14, borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0' }}>
                  <Image source={{ uri: selectedStudentForDetail.avatar }} style={{ width: 68, height: 68, borderRadius: 34, borderWidth: 2, borderColor: '#2563EB' }} />
                  <Text style={{ fontSize: 17, fontWeight: '800', color: '#0F172A', marginTop: 8 }}>{selectedStudentForDetail.name}</Text>
                  <Text style={{ fontSize: 12, fontWeight: '600', color: '#2563EB', marginTop: 2 }}>
                    Admission No: {selectedStudentForDetail.admissionNo} • Roll #{selectedStudentForDetail.roll}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                    <View style={{ backgroundColor: '#DBEAFE', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, marginRight: 6 }}>
                      <Text style={{ fontSize: 11, fontWeight: '800', color: '#1E40AF' }}>{selectedStudentForDetail.grade}</Text>
                    </View>
                    <View style={{ backgroundColor: selectedStudentForDetail.statusColor + '20', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 }}>
                      <Text style={{ fontSize: 11, fontWeight: '800', color: selectedStudentForDetail.statusColor }}>
                        ● {selectedStudentForDetail.status}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Key Student Info Grid */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
                  <View style={{ flex: 1, backgroundColor: '#EFF6FF', padding: 10, borderRadius: 12, marginRight: 6, alignItems: 'center' }}>
                    <Text style={{ fontSize: 10, fontWeight: '700', color: '#1E40AF', textTransform: 'uppercase' }}>ATTENDANCE</Text>
                    <Text style={{ fontSize: 15, fontWeight: '900', color: '#2563EB', marginTop: 2 }}>{selectedStudentForDetail.attendancePercent}</Text>
                  </View>
                  <View style={{ flex: 1, backgroundColor: '#ECFDF5', padding: 10, borderRadius: 12, marginHorizontal: 3, alignItems: 'center' }}>
                    <Text style={{ fontSize: 10, fontWeight: '700', color: '#065F46', textTransform: 'uppercase' }}>TERM SCORE</Text>
                    <Text style={{ fontSize: 15, fontWeight: '900', color: '#10B981', marginTop: 2 }}>{selectedStudentForDetail.marks}</Text>
                  </View>
                  <View style={{ flex: 1, backgroundColor: '#FFFBEB', padding: 10, borderRadius: 12, marginLeft: 6, alignItems: 'center' }}>
                    <Text style={{ fontSize: 10, fontWeight: '700', color: '#92400E', textTransform: 'uppercase' }}>BLOOD GROUP</Text>
                    <Text style={{ fontSize: 15, fontWeight: '900', color: '#D97706', marginTop: 2 }}>{selectedStudentForDetail.bloodGroup}</Text>
                  </View>
                </View>

                {/* Personal & Demographics */}
                <Text style={{ fontSize: 12, fontWeight: '800', color: '#475569', marginTop: 14, marginBottom: 6, textTransform: 'uppercase' }}>
                  PERSONAL INFORMATION
                </Text>
                <View style={{ backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#F1F5F9', padding: 12 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' }}>
                    <Text style={{ fontSize: 12, color: '#64748B' }}>Date of Birth</Text>
                    <Text style={{ fontSize: 12, fontWeight: '700', color: '#0F172A' }}>{selectedStudentForDetail.dob}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' }}>
                    <Text style={{ fontSize: 12, color: '#64748B' }}>Gender</Text>
                    <Text style={{ fontSize: 12, fontWeight: '700', color: '#0F172A' }}>{selectedStudentForDetail.gender}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
                    <Text style={{ fontSize: 12, color: '#64748B' }}>Class Section</Text>
                    <Text style={{ fontSize: 12, fontWeight: '700', color: '#0F172A' }}>Section {selectedStudentForDetail.section}</Text>
                  </View>
                </View>

                {/* Guardian Details */}
                <Text style={{ fontSize: 12, fontWeight: '800', color: '#475569', marginTop: 14, marginBottom: 6, textTransform: 'uppercase' }}>
                  GUARDIAN & CONTACT DETAILS
                </Text>
                <View style={{ backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#F1F5F9', padding: 12 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' }}>
                    <Text style={{ fontSize: 12, color: '#64748B' }}>Father's Name</Text>
                    <Text style={{ fontSize: 12, fontWeight: '700', color: '#0F172A' }}>{selectedStudentForDetail.guardian?.fatherName || 'Not Specified'}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' }}>
                    <Text style={{ fontSize: 12, color: '#64748B' }}>Mother's Name</Text>
                    <Text style={{ fontSize: 12, fontWeight: '700', color: '#0F172A' }}>{selectedStudentForDetail.guardian?.motherName || 'Not Specified'}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' }}>
                    <Text style={{ fontSize: 12, color: '#64748B' }}>Primary Phone</Text>
                    <Text style={{ fontSize: 12, fontWeight: '700', color: '#2563EB' }}>{selectedStudentForDetail.guardian?.phone || 'N/A'}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' }}>
                    <Text style={{ fontSize: 12, color: '#64748B' }}>Email Address</Text>
                    <Text style={{ fontSize: 12, fontWeight: '700', color: '#0F172A' }}>{selectedStudentForDetail.guardian?.email || 'N/A'}</Text>
                  </View>
                  <View style={{ paddingVertical: 5 }}>
                    <Text style={{ fontSize: 12, color: '#64748B' }}>Residential Address</Text>
                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#334155', marginTop: 2 }}>{selectedStudentForDetail.guardian?.address || 'N/A'}</Text>
                  </View>
                </View>

                {/* Academic History */}
                <Text style={{ fontSize: 12, fontWeight: '800', color: '#475569', marginTop: 14, marginBottom: 6, textTransform: 'uppercase' }}>
                  ACADEMIC HISTORY & PROMOTIONS
                </Text>
                <View style={{ backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#F1F5F9', padding: 12 }}>
                  {selectedStudentForDetail.academicHistory?.map((hist, idx) => (
                    <View key={idx} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6, borderBottomWidth: idx < selectedStudentForDetail.academicHistory.length - 1 ? 1 : 0, borderBottomColor: '#F8FAFC' }}>
                      <View>
                        <Text style={{ fontSize: 12, fontWeight: '700', color: '#0F172A' }}>{hist.year} • {hist.grade}</Text>
                        <Text style={{ fontSize: 11, color: '#64748B' }}>{hist.term}: {hist.result}</Text>
                      </View>
                      <View style={{ backgroundColor: '#EFF6FF', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 }}>
                        <Text style={{ fontSize: 11, fontWeight: '800', color: '#2563EB' }}>{hist.percentage}</Text>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Academic Report Card Button (Available for Admin, Teacher, Parent) */}
                <TouchableOpacity
                  style={[styles.loginSignInButton, { backgroundColor: '#1E3A8A', marginTop: 14, flexDirection: 'row', justifyContent: 'center' }]}
                  onPress={() => {
                    setStudentDetailModalVisible(false);
                    setSelectedStudentForReport(selectedStudentForDetail);
                    setCurrentScreen('report_card');
                  }}
                >
                  <Ionicons name="ribbon-outline" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                  <Text style={styles.signInButtonText}>View Academic Report Card</Text>
                </TouchableOpacity>

                {/* Admin Management Buttons (Only for Admin role) */}
                {userRole === 'admin' && (
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <TouchableOpacity
                      style={[styles.loginSignInButton, { flex: 1, marginRight: 6, backgroundColor: '#2563EB', marginTop: 0 }]}
                      onPress={() => {
                        setStudentDetailModalVisible(false);
                        handleOpenEditStudent(selectedStudentForDetail);
                      }}
                    >
                      <Text style={styles.signInButtonText}>Edit Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.loginSignInButton, { flex: 1, marginLeft: 6, backgroundColor: '#DC2626', marginTop: 0 }]}
                      onPress={() => handleDeleteStudentRecord(selectedStudentForDetail.id)}
                    >
                      <Text style={styles.signInButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </ScrollView>
            )}

            <TouchableOpacity
              style={[styles.loginSignInButton, { backgroundColor: '#64748B', marginTop: 8 }]}
              onPress={() => setStudentDetailModalVisible(false)}
            >
              <Text style={styles.signInButtonText}>Close Record</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 21. Add / Edit Student Record Modal (Admin Easy-To-Use Form) */}
      <Modal visible={studentAddEditModalVisible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setStudentAddEditModalVisible(false)}
        >
          <View style={[styles.modalBox, { width: 350, maxHeight: '90%', paddingHorizontal: 18 }]}>
            <View style={styles.modalHeaderRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name={editingStudentId ? "create" : "person-add"} size={20} color="#2563EB" style={{ marginRight: 6 }} />
                <Text style={styles.modalMainTitle}>{editingStudentId ? 'Edit Student Profile' : 'Add New Student'}</Text>
              </View>
              <TouchableOpacity onPress={() => setStudentAddEditModalVisible(false)}>
                <Ionicons name="close" size={22} color="#4A5568" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ marginVertical: 10 }}>
              {/* Student Name */}
              <Text style={{ fontSize: 11, fontWeight: '700', color: '#475569', marginBottom: 4 }}>STUDENT FULL NAME *</Text>
              <View style={[styles.inputPillContainer, { marginBottom: 10, height: 44 }]}>
                <TextInput
                  style={styles.textInputField}
                  placeholder="e.g. Aarav Sharma"
                  placeholderTextColor="#94A3B8"
                  value={formName}
                  onChangeText={setFormName}
                />
              </View>

              {/* Admission No & Roll */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1, marginRight: 6 }}>
                  <Text style={{ fontSize: 11, fontWeight: '700', color: '#475569', marginBottom: 4 }}>ADMISSION NO *</Text>
                  <View style={[styles.inputPillContainer, { marginBottom: 10, height: 44 }]}>
                    <TextInput
                      style={styles.textInputField}
                      placeholder="ADM-2026-..."
                      placeholderTextColor="#94A3B8"
                      value={formAdmNo}
                      onChangeText={setFormAdmNo}
                    />
                  </View>
                </View>
                <View style={{ flex: 1, marginLeft: 6 }}>
                  <Text style={{ fontSize: 11, fontWeight: '700', color: '#475569', marginBottom: 4 }}>ROLL NUMBER</Text>
                  <View style={[styles.inputPillContainer, { marginBottom: 10, height: 44 }]}>
                    <TextInput
                      style={styles.textInputField}
                      placeholder="Roll #"
                      placeholderTextColor="#94A3B8"
                      keyboardType="numeric"
                      value={formRoll}
                      onChangeText={setFormRoll}
                    />
                  </View>
                </View>
              </View>

              {/* Class Grade Selector */}
              <Text style={{ fontSize: 11, fontWeight: '700', color: '#475569', marginBottom: 4 }}>ASSIGNED CLASS</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                {['Grade 6-A', 'Class 4-B', 'Class 7-A', 'KG-II'].map((cls) => (
                  <TouchableOpacity
                    key={cls}
                    style={[
                      styles.settingsEditBadge,
                      formGrade === cls && { backgroundColor: '#2563EB', borderColor: '#2563EB' },
                    ]}
                    onPress={() => setFormGrade(cls)}
                  >
                    <Text style={[styles.settingsEditBadgeText, formGrade === cls && { color: '#FFFFFF' }]}>
                      {cls}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Status Selector */}
              <Text style={{ fontSize: 11, fontWeight: '700', color: '#475569', marginBottom: 4 }}>ENROLLMENT STATUS</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                {['Active', 'Pending Verification', 'On Leave'].map((st) => (
                  <TouchableOpacity
                    key={st}
                    style={[
                      styles.settingsEditBadge,
                      formStatus === st && { backgroundColor: '#10B981', borderColor: '#10B981' },
                    ]}
                    onPress={() => setFormStatus(st)}
                  >
                    <Text style={[styles.settingsEditBadgeText, formStatus === st && { color: '#FFFFFF' }]}>
                      {st}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Demographics: Blood Group & Gender */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1, marginRight: 6 }}>
                  <Text style={{ fontSize: 11, fontWeight: '700', color: '#475569', marginBottom: 4 }}>BLOOD GROUP</Text>
                  <View style={[styles.inputPillContainer, { marginBottom: 10, height: 44 }]}>
                    <TextInput
                      style={styles.textInputField}
                      placeholder="e.g. B+, O+, AB+"
                      placeholderTextColor="#94A3B8"
                      value={formBloodGroup}
                      onChangeText={setFormBloodGroup}
                    />
                  </View>
                </View>
                <View style={{ flex: 1, marginLeft: 6 }}>
                  <Text style={{ fontSize: 11, fontWeight: '700', color: '#475569', marginBottom: 4 }}>GENDER</Text>
                  <View style={[styles.inputPillContainer, { marginBottom: 10, height: 44 }]}>
                    <TextInput
                      style={styles.textInputField}
                      placeholder="Male / Female"
                      placeholderTextColor="#94A3B8"
                      value={formGender}
                      onChangeText={setFormGender}
                    />
                  </View>
                </View>
              </View>

              {/* Guardian Details */}
              <Text style={{ fontSize: 11, fontWeight: '800', color: '#2563EB', marginTop: 6, marginBottom: 6, textTransform: 'uppercase' }}>
                GUARDIAN CONTACT DETAILS
              </Text>

              <Text style={{ fontSize: 11, fontWeight: '700', color: '#475569', marginBottom: 4 }}>FATHER'S NAME</Text>
              <View style={[styles.inputPillContainer, { marginBottom: 8, height: 44 }]}>
                <TextInput
                  style={styles.textInputField}
                  placeholder="Father full name"
                  placeholderTextColor="#94A3B8"
                  value={formFatherName}
                  onChangeText={setFormFatherName}
                />
              </View>

              <Text style={{ fontSize: 11, fontWeight: '700', color: '#475569', marginBottom: 4 }}>MOTHER'S NAME</Text>
              <View style={[styles.inputPillContainer, { marginBottom: 8, height: 44 }]}>
                <TextInput
                  style={styles.textInputField}
                  placeholder="Mother full name"
                  placeholderTextColor="#94A3B8"
                  value={formMotherName}
                  onChangeText={setFormMotherName}
                />
              </View>

              <Text style={{ fontSize: 11, fontWeight: '700', color: '#475569', marginBottom: 4 }}>GUARDIAN PHONE NUMBER</Text>
              <View style={[styles.inputPillContainer, { marginBottom: 8, height: 44 }]}>
                <TextInput
                  style={styles.textInputField}
                  placeholder="+91 98..."
                  placeholderTextColor="#94A3B8"
                  keyboardType="phone-pad"
                  value={formGuardianPhone}
                  onChangeText={setFormGuardianPhone}
                />
              </View>

              <Text style={{ fontSize: 11, fontWeight: '700', color: '#475569', marginBottom: 4 }}>GUARDIAN EMAIL</Text>
              <View style={[styles.inputPillContainer, { marginBottom: 8, height: 44 }]}>
                <TextInput
                  style={styles.textInputField}
                  placeholder="parent@email.com"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  value={formGuardianEmail}
                  onChangeText={setFormGuardianEmail}
                />
              </View>

              <Text style={{ fontSize: 11, fontWeight: '700', color: '#475569', marginBottom: 4 }}>RESIDENTIAL ADDRESS</Text>
              <View style={[styles.inputPillContainer, { marginBottom: 12, height: 44 }]}>
                <TextInput
                  style={styles.textInputField}
                  placeholder="Street address, city"
                  placeholderTextColor="#94A3B8"
                  value={formAddress}
                  onChangeText={setFormAddress}
                />
              </View>
            </ScrollView>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <TouchableOpacity
                style={[styles.loginSignInButton, { flex: 1, marginRight: 6, backgroundColor: '#94A3B8', marginTop: 0 }]}
                onPress={() => setStudentAddEditModalVisible(false)}
              >
                <Text style={styles.signInButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.loginSignInButton, { flex: 1, marginLeft: 6, backgroundColor: '#10B981', marginTop: 0 }]}
                onPress={handleSaveStudentRecord}
              >
                <Text style={styles.signInButtonText}>
                  {editingStudentId ? 'Update Record' : 'Save Student'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

// ==========================================
// UNIFIED PIXEL-PERFECT STYLES
// ==========================================
const styles = StyleSheet.create({
  appRoot: {
    flex: 1,
    backgroundColor: '#0A0618',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneFrame: {
    width: '100%',
    maxWidth: 412,
    flex: 1,
    backgroundColor: '#F8FAFC',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
  },
  screenScrollView: {
    flex: 1,
  },

  // --- ROLE SELECTOR STYLES (LOGIN SCREEN) ---
  loginRoleSelector: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 24,
    padding: 4,
    width: '100%',
    marginBottom: 14,
  },
  loginRoleTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 20,
  },
  loginRoleTabActive: {
    backgroundColor: '#2563EB',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  loginRoleTabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  loginRoleTabTextActive: {
    color: '#FFFFFF',
  },
  loginRoleBadgePill: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    marginBottom: 8,
  },
  loginRoleBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#2563EB',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  // --- LOGIN SCREEN STYLES ---
  loginHeaderGradient: {
    height: 300,
    width: '100%',
  },
  loginTopBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 36 : 10,
  },
  loginLangButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
  },
  loginLangText: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: 14,
    fontWeight: '600',
  },
  loginHeaderContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 25,
  },
  loginLogoContainer: {
    alignItems: 'center',
  },
  loginLogoTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 2.2,
    marginTop: 14,
  },
  loginCardContainer: {
    flex: 1,
    marginTop: -28,
  },
  loginCard: {
    flex: 1,
    backgroundColor: '#F3F5F9',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 32,
    paddingTop: 45,
    alignItems: 'center',
  },
  loginWelcomeText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#151E3F',
    letterSpacing: 0.2,
    marginBottom: 38,
  },
  loginForm: {
    width: '100%',
    alignItems: 'center',
  },
  inputPillContainer: {
    width: '100%',
    height: 52,
    backgroundColor: '#E2E5EB',
    borderRadius: 26,
    marginBottom: 16,
    justifyContent: 'center',
    paddingHorizontal: 22,
    position: 'relative',
  },
  textInputField: {
    width: '100%',
    height: '100%',
    fontSize: 15,
    color: '#1A202C',
    fontWeight: '500',
    ...(Platform.OS === 'web' ? { outlineStyle: 'none' } : {}),
  },
  clearIconWrap: {
    position: 'absolute',
    right: 18,
    top: 17,
  },
  eyeIconWrap: {
    position: 'absolute',
    right: 18,
    top: 16,
  },
  loginRowActions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 44,
    paddingHorizontal: 8,
  },
  loginDialButton: {
    padding: 6,
    backgroundColor: 'rgba(0, 168, 198, 0.08)',
    borderRadius: 8,
  },
  dialpadGrid: {
    width: 26,
    height: 26,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  dialDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: '#00A8C6',
    backgroundColor: 'transparent',
    margin: 1.2,
  },
  forgotPasswordText: {
    color: '#2980B9',
    fontSize: 13,
    fontWeight: '600',
  },
  loginSignInButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#00A7CB',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00A7CB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  privacyLinkWrap: {
    marginTop: 48,
    paddingVertical: 8,
  },
  privacyLinkText: {
    color: '#34495E',
    fontSize: 13,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },

  // --- DASHBOARD HEADER ---
  dashHeaderContainer: {
    backgroundColor: '#1E3EDB',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 36 : 12,
    paddingBottom: 28,
  },
  dashHeaderBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  schoolHoxLogoWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  schoolHoxText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: 0.4,
    marginLeft: 8,
  },
  bellBadgeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    position: 'absolute',
    top: 8,
    right: 8,
    borderWidth: 1.5,
    borderColor: '#1E3EDB',
  },
  greetingTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  studentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  avatarWrap: {
    marginRight: 14,
  },
  studentInfoWrap: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  studentClass: {
    fontSize: 13,
    color: '#2563EB',
    fontWeight: '600',
    marginTop: 2,
  },

  // --- SUBPAGE HEADER ---
  subpageHeader: {
    backgroundColor: '#1E3EDB',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 36 : 12,
    paddingBottom: 55,
  },
  subpageHeaderBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subpageNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  roundBackBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subpageNavTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },

  // --- DASHBOARD BODY (MAIN SCREEN) ---
  dashBodyContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -16,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 28,
  },

  // --- SUBPAGE BODY (ATTENDANCE, FEES, HOMEWORK, BUS) ---
  subpageBodyContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -22,
    paddingHorizontal: 20,
    paddingTop: 36,
    paddingBottom: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  statCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  rupeeIcon: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
  statTextWrap: {
    flex: 1,
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },

  // --- RECENT ACTIVITY ---
  recentActivityBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 8,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  recentHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  recentHeaderTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  viewAllBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
  },
  activityItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  activityCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityDetailWrap: {
    flex: 1,
  },
  activityPrimary: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  activitySecondary: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  activityTimestamp: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },

  // --- ACTION BANNER BUTTON ---
  actionBannerBtn: {
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  actionBannerText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563EB',
  },

  // --- OVERLAPPING PILL CARD ---
  overlappingCardWrap: {
    paddingHorizontal: 20,
    marginTop: -42,
    zIndex: 20,
    marginBottom: 0,
  },
  todayAttendancePill: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  todayAttendanceTitle: {
    fontSize: 13,
    color: '#1E293B',
    fontWeight: '600',
  },
  todayAttendanceBigTime: {
    fontSize: 26,
    fontWeight: '800',
    color: '#10B981',
    marginTop: 4,
  },
  greenCheckmarkCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // --- CHART CARD ---
  attendanceChartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  chartHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitleText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  chartMaxLabel: {
    fontSize: 11,
    color: '#94A3B8',
  },
  barsFlexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 140,
    alignItems: 'flex-end',
    paddingBottom: 8,
  },
  singleBarColumn: {
    alignItems: 'center',
    width: 38,
  },
  barOuterTrack: {
    width: 14,
    height: 100,
    backgroundColor: '#F1F5F9',
    borderRadius: 7,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    marginBottom: 8,
  },
  barInnerFill: {
    width: '100%',
    borderRadius: 7,
  },
  barDayLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  barDateLabel: {
    fontSize: 9,
    color: '#94A3B8',
    marginTop: 2,
  },
  chartLegendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  legendItemWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  legendPill: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginRight: 4,
  },
  legendLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
  },
  legendRightPercent: {
    marginLeft: 'auto',
    fontSize: 10,
    color: '#94A3B8',
  },

  // --- LATEST RESULT & DETAILS ---
  latestResultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  latestResultHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 14,
  },
  resultDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  trophyIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resultSubjectWrap: {
    flex: 1,
  },
  resultSubjectName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  resultDateText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  resultGradeWrap: {
    alignItems: 'flex-end',
  },
  resultScoreText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2563EB',
  },
  resultGradeText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 2,
  },
  reportCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  reportCardLinkText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
  },

  // --- FEES SPECIFIC ---
  feeBreakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  feeBreakdownLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  feeBreakdownValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  feePaidConfirmBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECFDF5',
    paddingVertical: 12,
    borderRadius: 16,
    marginTop: 14,
  },
  feePaidConfirmText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#065F46',
  },

  // --- HOMEWORK SPECIFIC ---
  filterTabsRow: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 14,
    padding: 3,
    marginBottom: 16,
  },
  filterTabBtn: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: 12,
  },
  filterTabBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  filterTabTextActive: {
    color: '#2563EB',
    fontWeight: '700',
  },
  homeworkCheckRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  homeworkTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  taskDoneText: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  homeworkSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  homeworkBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: '#DC2626',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },

  // --- BUS ROUTE SPECIFIC ---
  stopTimelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  timelineIndicatorColumn: {
    alignItems: 'center',
    width: 24,
    marginRight: 12,
  },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  timelineLine: {
    width: 2,
    height: 32,
    marginVertical: 2,
  },
  timelineTextWrap: {
    flex: 1,
    paddingTop: 1,
  },
  stopNameText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  stopTimeText: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  callDriverBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  simulatedMapBox: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 10,
    position: 'relative',
    backgroundColor: '#E2E8F0',
  },
  mapFloatingTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },

  // --- BOTTOM TAB BAR ---
  bottomNavContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navTabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  navTabLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
    marginTop: 3,
  },
  navTabLabelActive: {
    color: '#2563EB',
    fontWeight: '700',
  },
  feesRupeeTab: {
    fontSize: 19,
    fontWeight: '800',
    height: 22,
    textAlign: 'center',
  },

  // --- MODALS ---
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalBox: {
    width: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalMainTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 4,
  },
  modalSubText: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
    lineHeight: 18,
  },
  languageOptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 6,
  },
  languageOptionSelected: {
    backgroundColor: '#E6F8FB',
  },
  languageOptionText: {
    fontSize: 15,
    color: '#4A5568',
    fontWeight: '500',
  },
  languageOptionTextActive: {
    color: '#00A7CB',
    fontWeight: '700',
  },
  pinIndicatorsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 14,
    gap: 16,
  },
  pinDotCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#00A7CB',
    backgroundColor: 'transparent',
  },
  pinDotCircleFilled: {
    backgroundColor: '#00A7CB',
  },
  pinKeypadGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 8,
  },
  keypadKeyBtn: {
    width: 68,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
  },
  keypadKeyBlank: {
    width: 68,
    height: 52,
    margin: 6,
  },
  keypadKeyNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
  },
  privacyContentText: {
    fontSize: 13,
    color: '#4A5568',
    lineHeight: 20,
  },

  // --- SMART DIARY SECTION BANNER (IN DASHBOARD) ---
  smartDiaryBannerCard: {
    backgroundColor: '#EEF2FF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
    shadowColor: '#4338CA',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  smartDiaryBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smartDiaryBannerIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  smartDiaryBannerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E1B4B',
  },
  smartDiaryBadge: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  smartDiaryBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  smartDiaryBannerSubtitle: {
    fontSize: 12,
    color: '#6366F1',
    fontWeight: '600',
    marginTop: 3,
  },

  // --- SMART DIARY TOP NAV & CALENDAR (SCHEDULE & GRADES) ---
  diaryTopNavBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: Platform.OS === 'android' ? 36 : 14,
    paddingBottom: 16,
  },
  diaryScreenTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  diaryTopAvatarWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  diaryTopAvatar: {
    width: '100%',
    height: '100%',
  },
  diaryCalendarStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 18,
  },
  diaryCalendarCol: {
    alignItems: 'center',
    flex: 1,
  },
  diaryCalendarDayName: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.75)',
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  diaryCalendarDayCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  diaryCalendarDayCircleSelected: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  diaryCalendarDayNum: {
    fontSize: 15,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.95)',
  },
  diaryCalendarDayNumSelected: {
    color: '#1E293B',
    fontWeight: '800',
  },

  // --- SCHEDULE CARDS (LEFT SCREEN) ---
  diaryScheduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingHorizontal: 22,
    paddingVertical: 6,
    marginBottom: 14,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },
  diaryScheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  diaryScheduleSubject: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  diaryScheduleTime: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 3,
  },
  diaryRedDotBadge: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#EF4444',
    marginRight: 6,
  },
  diaryNumberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  diaryNumberBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  diaryOutOfClassCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingVertical: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 16,
  },
  diaryOutOfClassRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  diaryOutOfClassTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  diaryOutOfClassTag: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94A3B8',
    marginLeft: 4,
  },
  diaryOutOfClassTime: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 4,
  },

  // --- LESSON DETAIL VIEW (MIDDLE SCREEN) ---
  diaryDetailTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: Platform.OS === 'android' ? 36 : 14,
    paddingBottom: 16,
  },
  diaryBackChevronBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  diaryDetailHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 4,
  },
  diaryDetailTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    flex: 1,
  },
  diaryGradeCircleBig: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  diaryGradeCircleBigText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  diaryTopicSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
    lineHeight: 20,
  },
  diaryMetaBlock: {
    marginBottom: 14,
  },
  diaryMetaValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  diaryMetaLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  diarySectionCapTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.75)',
    letterSpacing: 0.8,
    marginTop: 10,
    marginBottom: 10,
  },
  diaryHomeworkCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  diaryHomeworkText: {
    fontSize: 13,
    lineHeight: 19,
    color: '#1E293B',
    fontWeight: '600',
    flex: 1,
    paddingRight: 14,
  },
  diaryGradeCircleSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  diaryGradeCircleSmallText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  diaryCommentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  diaryCommentHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  diaryCommentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  diaryCommentAuthor: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  diaryCommentRole: {
    fontSize: 11,
    fontWeight: '500',
    color: '#94A3B8',
  },
  diaryCommentBody: {
    fontSize: 13,
    lineHeight: 18,
    color: '#334155',
    fontWeight: '500',
    marginBottom: 8,
  },
  diaryCommentReplyBtn: {
    alignSelf: 'flex-start',
  },
  diaryCommentReplyText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
  },
  diaryAddCommentBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
  diaryHomeIndicatorWrap: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  diaryHomeIndicatorBar: {
    width: 134,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#1E293B',
  },

  // --- GRADES VIEW (RIGHT SCREEN) ---
  diaryGradesHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
    paddingBottom: 14,
  },
  diaryPerformanceLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.85)',
    letterSpacing: 0.6,
  },
  diaryYearPill: {
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 3,
  },
  diaryYearPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  diaryGradesCardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingVertical: 6,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
    marginBottom: 16,
  },
  diaryGradeItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  diaryGradeSubjectName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  diaryGradeSubjectScore: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },

  // --- DIARY BOTTOM NAV BAR ---
  diaryBottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingVertical: 10,
    paddingHorizontal: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  diaryNavTab: {
    alignItems: 'center',
    paddingVertical: 4,
    flex: 1,
    position: 'relative',
  },
  diaryNavLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#8E9EC5',
    marginTop: 4,
  },
  diaryNavLabelActive: {
    color: '#2B57B2',
    fontWeight: '700',
  },
  diaryNavUnderline: {
    width: 24,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#2B57B2',
    marginTop: 4,
  },

  // --- NOTIFICATIONS SCREEN STYLES ---
  notifItemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  notifItemCardUnread: {
    borderColor: '#BFDBFE',
    backgroundColor: '#FFFFFF',
    shadowOpacity: 0.08,
    elevation: 3,
  },
  notifIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifItemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
    flex: 1,
  },
  unreadBlueDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563EB',
    marginLeft: 6,
  },
  notifItemDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
    marginTop: 4,
  },
  notifCategoryTag: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563EB',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  notifTimestampText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
  emptyNotifBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyNotifTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 12,
  },
  emptyNotifDesc: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
  },

  // --- SETTINGS SCREEN STYLES ---
  settingsStudentName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  settingsStudentSub: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
    marginTop: 2,
  },
  settingsEditBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  settingsEditBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  settingsGroupTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.6,
    marginTop: 6,
    marginBottom: 10,
    marginLeft: 4,
  },
  settingsGroupCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 4,
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  settingsRowTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  settingsRowSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 2,
  },
  settingsSignOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    borderRadius: 18,
    paddingVertical: 14,
    marginTop: 6,
    marginBottom: 24,
  },
  settingsSignOutText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#DC2626',
  },

  // --- TEACHER MOBILE DASHBOARD STYLES (EXACT DESIGN) ---
  teacherBannerCard: {
    backgroundColor: '#F0FDFA',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#99F6E4',
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  teacherTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 38 : 12,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
  },
  teacherIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teacherTopTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#0F172A',
  },
  teacherCalBadgeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    marginRight: 10,
  },
  teacherCalBadgeText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginLeft: 4,
  },
  teacherBellBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  teacherNotifDot: {
    position: 'absolute',
    top: 6,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },

  // Search Wrap
  teacherSearchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  teacherSearchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
  },

  // Hero Card: Mark Attendance
  teacherHeroCard: {
    backgroundColor: '#2E798A',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    shadowColor: '#134E4A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 6,
  },
  teacherHeroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  teacherHeroSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.88)',
    marginTop: 6,
    marginBottom: 16,
    lineHeight: 18,
  },
  teacherAddNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  teacherAddNowText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#2E798A',
  },
  teacherChartWrap: {
    width: 96,
    height: 96,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Quick Access Section
  teacherSectionHeading: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  teacherSectionHeadingInline: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  teacherQuickAccessRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  teacherQuickCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 6,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  teacherQuickIconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  teacherQuickLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 15,
  },

  // Calendar Card
  teacherCalendarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginBottom: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  teacherCalendarStripRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teacherCalendarDayCol: {
    alignItems: 'center',
    flex: 1,
  },
  teacherCalDayName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 8,
  },
  teacherCalDayNumBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teacherCalDayNumBoxSelected: {
    backgroundColor: '#2E798A',
    shadowColor: '#2E798A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  teacherCalDayNumText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  teacherCalDayNumTextSelected: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  teacherCalendarArrowBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },

  // Attendance Report Header & Card
  teacherReportHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  teacherMonthPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  teacherMonthPillText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#2563EB',
  },
  teacherReportCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  teacherReportTopMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  teacherReportBigPercent: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
  },
  teacherReportSubtext: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
  },
  teacherReportGraphBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 100,
    paddingTop: 10,
  },
  teacherBarBackground: {
    width: 22,
    height: 70,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  teacherBarFill: {
    width: '100%',
    borderRadius: 8,
  },
  teacherBarDayLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94A3B8',
    marginTop: 6,
  },

  // Classes List
  teacherClassesListCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 6,
    marginBottom: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  teacherClassItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  teacherClassBadgeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  teacherClassSubject: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  teacherClassTime: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  teacherClassStatusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  teacherClassStatusText: {
    fontSize: 11,
    fontWeight: '700',
  },

  // Teacher Bottom Nav Bar
  teacherBottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingVertical: 10,
    paddingHorizontal: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  teacherBottomTab: {
    alignItems: 'center',
    paddingVertical: 4,
    flex: 1,
  },
  teacherBottomTabLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94A3B8',
    marginTop: 3,
  },
  teacherBottomTabLabelActive: {
    color: '#2E798A',
    fontWeight: '800',
  },

  // Teacher Modal Elements
  teacherStudentAttendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  teacherAttendToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
  },
  teacherAttendBtnPresent: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  teacherAttendBtnAbsent: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  teacherAttendToggleText: {
    fontSize: 12,
    fontWeight: '700',
  },
  teacherMarksInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  teacherMarksInputText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    width: 38,
    textAlign: 'center',
  },
  teacherStudentCardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  teacherStudentAvatarWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  teacherStudentAvatarLetter: {
    fontSize: 15,
    fontWeight: '800',
    color: '#4F46E5',
  },
  teacherStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  teacherStatusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  teacherDrawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  teacherDrawerItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },

  // --- TEACHER SUBPAGE SCREENS STYLES ---
  teacherSubpageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  teacherBackBtn: {
    padding: 6,
    borderRadius: 8,
  },
  teacherSubpageTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  teacherSubpageActionBtn: {
    padding: 6,
  },
  teacherScheduleDayTabs: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    justifyContent: 'space-between',
  },
  teacherScheduleDayBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
  },
  teacherScheduleDayBtnActive: {
    backgroundColor: '#2E798A',
  },
  teacherScheduleDayText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  teacherScheduleDayTextActive: {
    color: '#FFFFFF',
  },
  teacherScheduleBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  teacherScheduleSwapBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
  },
  teacherScheduleSwapText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2E798A',
  },
  teacherScheduleCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  teacherScheduleTimeCol: {
    width: 68,
    borderRightWidth: 1,
    borderRightColor: '#F1F5F9',
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teacherScheduleTimeText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  teacherScheduleTimeSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  teacherScheduleStatusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 6,
  },
  teacherScheduleContentCol: {
    flex: 1,
    paddingLeft: 12,
  },
  teacherScheduleClassSubject: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  teacherScheduleClassRoom: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  teacherScheduleTopicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  teacherScheduleTopicText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '600',
  },
  teacherScheduleActionRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 8,
  },
  teacherScheduleMiniBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDFA',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  teacherScheduleMiniBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2E798A',
  },

  // Exams Screen Styles
  teacherExamFilterRow: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    gap: 8,
  },
  teacherExamFilterPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
  },
  teacherExamFilterPillActive: {
    backgroundColor: '#2E798A',
  },
  teacherExamFilterText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  teacherExamFilterTextActive: {
    color: '#FFFFFF',
  },
  teacherMarksBannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2E798A',
    borderRadius: 16,
    padding: 16,
    marginTop: 14,
  },
  teacherMarksBannerBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  teacherMarksBannerBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#2E798A',
  },
  teacherExamItemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  teacherExamClassBadge: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    textTransform: 'uppercase',
  },
  teacherExamStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  teacherExamTitleText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 6,
  },
  teacherExamFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },

  // AI Assistant Screen Styles
  teacherAiQuickPromptsRow: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 8,
  },
  teacherAiPromptChip: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  teacherAiPromptChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  teacherAiMessageWrap: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'flex-start',
  },
  teacherAiMessageLeft: {
    justifyContent: 'flex-start',
  },
  teacherAiMessageRight: {
    justifyContent: 'flex-end',
  },
  teacherAiAvatarBox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#2E798A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 2,
  },
  teacherAiMessageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  teacherAiBubbleLeft: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderTopLeftRadius: 4,
  },
  teacherAiBubbleRight: {
    backgroundColor: '#2E798A',
    borderTopRightRadius: 4,
  },
  teacherAiMessageText: {
    fontSize: 13,
    lineHeight: 19,
  },
  teacherAiInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  teacherAiTextInput: {
    flex: 1,
    height: 42,
    backgroundColor: '#F8FAFC',
    borderRadius: 21,
    paddingHorizontal: 16,
    fontSize: 13,
    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  teacherAiSendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#2E798A',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },

  // ==========================================
  // EDUSPHERE ADMIN DASHBOARD STYLES
  // ==========================================
  eduSphereLogoWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eduSphereIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#38BDF8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 3,
  },
  eduSphereBrandName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },
  eduSphereBrandTagline: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94A3B8',
  },
  adminHeaderGradient: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 36 : 14,
    paddingBottom: 22,
  },
  adminTopNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  adminHeaderActionBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  adminAvatarSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminGreetingWrap: {
    marginTop: 18,
  },
  adminBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  adminStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 10,
  },
  adminOnlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 5,
  },
  adminStatusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#34D399',
  },
  adminSessionText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
  adminGreetingTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  adminGreetingSub: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 3,
  },
  adminTimeframeRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 3,
    marginTop: 16,
  },
  adminTimeframeBtn: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 13,
    alignItems: 'center',
  },
  adminTimeframeBtnActive: {
    backgroundColor: '#2563EB',
  },
  adminTimeframeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
  adminTimeframeTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  adminBodyContainer: {
    flex: 1,
    paddingHorizontal: 18,
    marginTop: -8,
  },
  adminSectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  adminQuickActionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  adminQuickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  adminActionCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  adminActionIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  adminActionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
    textAlign: 'center',
  },
  adminStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  adminCompactCard: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  adminCompactCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  adminCardIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminTrendPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  adminTrendText: {
    fontSize: 9,
    fontWeight: '800',
  },
  adminCompactCount: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.2,
  },
  adminCompactLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    marginTop: 2,
  },
  adminCompactSub: {
    fontSize: 10,
    fontWeight: '500',
    color: '#94A3B8',
    marginTop: 1,
  },
  adminSectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  adminSectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  adminCardMainTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  adminCardSubTitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  adminRateBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  adminRateBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#4F46E5',
  },
  adminViewDetailsText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
  adminChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    marginTop: 16,
    paddingHorizontal: 8,
  },
  adminChartColumn: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  adminChartBarValue: {
    fontSize: 9,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 4,
  },
  adminChartTrack: {
    width: 22,
    height: 80,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  adminChartFillBar: {
    width: '100%',
    borderRadius: 8,
  },
  adminChartDayLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 6,
  },
  adminAttendanceBreakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    marginTop: 14,
    paddingTop: 10,
  },
  adminBreakdownPill: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breakdownText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '600',
  },
  adminFeeMetricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  adminFeeMetricItem: {
    flex: 1,
    alignItems: 'center',
  },
  adminFeeDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#E2E8F0',
    alignSelf: 'center',
  },
  adminFeeMetricLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  adminFeeMetricVal: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  adminFeeMetricSub: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 1,
  },
  adminFeeProgressTrack: {
    height: 8,
    backgroundColor: '#FEF3C7',
    borderRadius: 4,
    marginTop: 14,
    overflow: 'hidden',
  },
  adminFeeProgressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  adminExamCardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  adminExamIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminExamTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  adminExamGrades: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  adminExamStatusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
  },
  adminExamStatusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  adminAnnouncementItem: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
  },
  adminAnnouncementTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  adminAnnBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  adminAnnBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  adminAnnDate: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '500',
  },
  adminAnnTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  adminAnnBody: {
    fontSize: 12,
    color: '#475569',
    marginTop: 3,
    lineHeight: 16,
  },
  adminAnnTarget: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 5,
  },
  adminBottomNavBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#0F172A',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  adminBottomNavTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  adminBottomNavLabel: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
    marginTop: 2,
  },
  adminBottomNavLabelActive: {
    color: '#38BDF8',
    fontWeight: '700',
  },

  /* Admin Faculty Oversight Styles */
  adminFacultyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#0F172A',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  adminFacultyBackBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adminFacultyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  adminFacultySub: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
    marginTop: 1,
  },
  adminFacultyAddBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adminFacultyBody: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  adminFacultySearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 46,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 10,
  },
  adminFacultySearchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
  },
  adminFacultyFilterRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  adminFacultyFilterPill: {
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  adminFacultyFilterPillActive: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  adminFacultyFilterPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  adminFacultyFilterPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  adminFacultyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  adminFacultyAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#BFDBFE',
  },
  adminFacultyAvatarText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2563EB',
  },
  adminFacultyName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  adminFacultyStatusPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  adminFacultyStatusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  adminFacultyRole: {
    fontSize: 12,
    color: '#475569',
    marginTop: 2,
    fontWeight: '500',
  },
  adminFacultyClasses: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 4,
    fontWeight: '500',
  },
  adminFacultyContactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  adminFacultyCallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  adminFacultyCallText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  adminFacultyExpText: {
    fontSize: 11,
    color: '#94A3B8',
    marginLeft: 'auto',
    fontWeight: '600',
  },

  /* Admin Finance & Fees Styles */
  adminFinanceTopCard: {
    borderRadius: 18,
    padding: 18,
    marginBottom: 6,
  },
  adminFinanceBigAmount: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  adminFinanceCatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  adminFinanceCatTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  adminFinanceCatSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  adminFinanceCatPct: {
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 4,
  },
  adminFinanceMiniTrack: {
    height: 5,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    overflow: 'hidden',
  },
  adminFinanceMiniFill: {
    height: '100%',
    borderRadius: 3,
  },
  adminTxnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  adminTxnIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adminTxnStudent: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  adminTxnDetails: {
    fontSize: 11,
    color: '#475569',
    marginTop: 1,
  },
  adminTxnDate: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 1,
  },
  adminTxnAmount: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  adminTxnSuccessBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 3,
  },
  adminTxnSuccessText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#059669',
  },

  /* ==========================================
     PARENT MOBILE DASHBOARD STYLES (MATCHING ATTACHED DESIGN)
     ========================================== */
  parentHeaderContainer: {
    backgroundColor: '#1E40AF',
    paddingTop: 8,
    paddingBottom: 28,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    position: 'relative',
    overflow: 'hidden',
  },
  parentTopBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 6,
  },
  parentRoundIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  parentGreetingSub: {
    fontSize: 11,
    color: '#BFDBFE',
    fontWeight: '500',
  },
  parentGreetingName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  parentNotifDot: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#1E40AF',
  },
  parentAvatarImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  parentAvatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  parentChildSwitcherWrap: {
    paddingHorizontal: 18,
    marginTop: 14,
    marginBottom: 6,
  },
  parentChildSwitcherLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#93C5FD',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  parentChildPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  parentChildPillActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  parentChildPillAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  parentChildPillName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  parentChildPillNameActive: {
    color: '#1E40AF',
  },
  parentChildPillGrade: {
    fontSize: 9,
    color: '#BFDBFE',
    fontWeight: '500',
  },
  parentChildPillGradeActive: {
    color: '#3B82F6',
  },

  /* Top 2 Action Cards */
  parentTopCardsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  parentTopActionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    position: 'relative',
  },
  parentCardIconWrapBlue: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  parentCardIconWrapCyan: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  parentCardTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  parentCardSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '600',
  },
  parentBlueDotIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F59E0B',
  },

  /* Pagination Dots */
  parentDotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 6,
  },
  parentMiniDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 3,
  },
  parentMiniDotActive: {
    backgroundColor: '#1E40AF',
    width: 14,
    borderRadius: 3,
  },

  /* 6 Grid Cards */
  parentGridCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    marginTop: 6,
  },
  parentGridCard: {
    width: '46%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    margin: '2%',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  parentGridCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  parentGridCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginLeft: 8,
  },
  parentGridCardDesc: {
    fontSize: 10,
    color: '#64748B',
    lineHeight: 14,
  },

  /* Bottom Notice Board Banner (Screen 1) */
  parentNoticeBoardCard: {
    backgroundColor: '#0F1E36',
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 16,
    padding: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  parentNoticeBoardIndicator: {
    position: 'absolute',
    top: 0,
    left: '42%',
    width: 44,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 2,
  },
  parentNoticeBoardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  parentNoticeBoardBody: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 6,
    lineHeight: 15,
  },

  /* Parent Bottom Nav Bar */
  parentBottomNavBar: {
    flexDirection: 'row',
    height: 62,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 6,
  },
  parentBottomNavTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  parentBottomNavText: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
    marginTop: 2,
  },
  parentBottomNavTextActive: {
    color: '#1D4ED8',
    fontWeight: '700',
  },

  /* Screen 2: Attendance Calendar Styles */
  parentAttHeader: {
    backgroundColor: '#0A192F',
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 18,
  },
  parentAttNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  parentAttTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
    flex: 1,
    marginLeft: 14,
  },
  parentAttSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
    paddingHorizontal: 4,
  },
  parentAttChildSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 24,
  },
  parentAttChildAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  parentAttChildName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  parentAttAvgLabel: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '500',
  },
  parentAttAvgValue: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 2,
  },
  parentChildDropdownMenu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 8,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  parentChildDropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  parentAttMonthBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  parentAttMonthText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  parentCalWeekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  parentCalWeekDayText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    width: 36,
    textAlign: 'center',
  },
  parentCalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    paddingBottom: 16,
  },
  parentCalCell: {
    width: '14.28%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  parentCalCircleGreen: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  parentCalCircleRed: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  parentCalTextWhite: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  parentCalTextNormal: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
  },
  parentUpcomingSection: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
  parentUpcomingTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  parentUpcomingViewAll: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
  parentEventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  parentEventDateBadgeBlue: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#1D4ED8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  parentEventDateNum: {
    fontSize: 13,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 15,
  },
  parentEventDateMonth: {
    fontSize: 9,
    fontWeight: '700',
    color: '#BFDBFE',
    textTransform: 'uppercase',
  },
  parentEventName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  parentEventMeta: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },

  /* Screen 3: Feed & Diary Styles */
  parentFeedHeader: {
    backgroundColor: '#0A192F',
    paddingTop: 8,
    paddingBottom: 0,
    paddingHorizontal: 18,
  },
  parentFeedChildPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  parentFeedChildPillActive: {
    backgroundColor: '#1D4ED8',
  },
  parentFeedChildAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    marginRight: 6,
  },
  parentFeedChildName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
  parentFeedChildNameActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  parentFeedCatBar: {
    flexDirection: 'row',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  parentFeedCatTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  parentFeedCatTabActive: {
    borderBottomColor: '#38BDF8',
  },
  parentFeedCatText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
  parentFeedCatTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  parentTimelineContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  parentTimelinePost: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  parentTimelineLeftCol: {
    width: 44,
    alignItems: 'center',
  },
  parentTimelineDateBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  parentTimelineDateNum: {
    fontSize: 12,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 14,
  },
  parentTimelineDateMonth: {
    fontSize: 9,
    fontWeight: '700',
    color: '#DBEAFE',
    textTransform: 'uppercase',
  },
  parentTimelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 4,
  },
  parentTimelineRightCol: {
    flex: 1,
    marginLeft: 12,
  },
  parentTimelinePostTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  parentTimelineShareText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
  },
  parentCraftPhotosRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  parentCraftImgSmall: {
    width: 72,
    height: 72,
    borderRadius: 12,
    marginRight: 8,
  },
  parentCraftImgMoreWrap: {
    width: 72,
    height: 72,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  parentCraftMoreOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  parentCraftMoreText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 14,
  },
  parentTimelineSubDesc: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 4,
    lineHeight: 15,
  },
  parentClassroomImg: {
    width: '100%',
    height: 120,
    borderRadius: 14,
    marginTop: 10,
  },

  /* ==========================================
     STUDENT DASHBOARD ENHANCEMENT STYLES
     ========================================== */
  studentSectionHeaderTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#475569',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  studentSectionHeaderSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  studentPortalsGrid: {
    marginTop: 10,
    gap: 10,
  },
  studentPortalBtnCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  studentPortalIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentPortalBtnTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  studentPortalBtnSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  studentPortalArrowWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  studentFeatureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  studentFeatureHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  studentFeatureIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentFeatureTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  studentFeatureSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
    fontWeight: '500',
  },
  studentLinkText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },

  /* Timetable Styles */
  studentTimetableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  studentTimetableTimeBox: {
    width: 58,
  },
  studentTimetableTimeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
  studentTimetableAmpmText: {
    fontSize: 9,
    color: '#94A3B8',
    fontWeight: '600',
  },
  studentTimetableIndicator: {
    width: 3.5,
    height: 32,
    borderRadius: 2,
    marginRight: 2,
  },
  studentTimetableSubject: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  studentTimetableTeacher: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  studentTimetableBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  studentTimetableBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },

  /* Homework Checklist Styles */
  studentProgressBarTrack: {
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    marginTop: 12,
    overflow: 'hidden',
  },
  studentProgressBarFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  studentHomeworkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  studentHomeworkRowDone: {
    opacity: 0.65,
  },
  studentCheckboxSquare: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  studentCheckboxSquareDone: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  studentHomeworkSubject: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  studentHomeworkDeadline: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
  },
  studentHomeworkTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
    marginTop: 2,
    lineHeight: 16,
  },
  studentHomeworkTitleDone: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },

  /* Upcoming Exams Styles */
  studentExamCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  studentExamTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  studentExamPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  studentExamPillText: {
    fontSize: 10,
    fontWeight: '800',
  },
  studentExamSyllabus: {
    fontSize: 11,
    color: '#475569',
    marginTop: 4,
    lineHeight: 15,
  },
  studentExamFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#EEF2F6',
  },
  studentExamDate: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563EB',
  },
  studentExamHall: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
  },

  /* Learning Materials Styles */
  studentMaterialsFilterRow: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 4,
  },
  studentMaterialsFilterPill: {
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    marginRight: 6,
  },
  studentMaterialsFilterPillActive: {
    backgroundColor: '#2563EB',
  },
  studentMaterialsFilterText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  studentMaterialsFilterTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  studentMaterialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  studentMaterialIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentMaterialTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  studentMaterialMeta: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },

  /* Recent Marks Styles */
  studentMarksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  studentMarksSubject: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  studentMarksExam: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  studentMarksScore: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  studentGradeBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentGradeBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },

  /* ==========================================
     STUDENT MANAGEMENT STYLES (ADMIN & TEACHER)
     ========================================== */
  adminStudentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  adminStudentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#38BDF8',
  },
  adminStudentName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  adminStudentStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  adminStudentStatusText: {
    fontSize: 10,
    fontWeight: '800',
  },
  adminStudentAdmNo: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  adminStudentMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  adminStudentGradeBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#38BDF8',
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 8,
  },
  adminStudentAttText: {
    fontSize: 10,
    color: '#10B981',
    fontWeight: '700',
    marginRight: 8,
  },
  adminStudentGpaText: {
    fontSize: 10,
    color: '#CBD5E1',
    fontWeight: '600',
  },
  adminStudentEditBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },

  /* Teacher Student Cards */
  teacherStudentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  teacherStudentAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#2E798A',
  },
  teacherStudentName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  teacherStudentStatusPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
});
