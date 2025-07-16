-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: May 07, 2025 at 02:26 PM
-- Server version: 10.6.19-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `social_networking`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_comments`
--

CREATE TABLE `tbl_comments` (
  `id` bigint(20) NOT NULL,
  `post_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `comments` text NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_comments`
--

INSERT INTO `tbl_comments` (`id`, `post_id`, `user_id`, `comments`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Nice to Meet You', 1, 0, '2025-05-06 22:14:25', '2025-05-06 22:14:25'),
(2, 1, 1, 'Hello Sir\n', 1, 0, '2025-05-06 22:28:34', '2025-05-06 22:28:34'),
(3, 1, 1, 'Hello Sir', 1, 0, '2025-05-06 22:29:48', '2025-05-06 22:29:48'),
(4, 1, 1, 'Hello Sir', 1, 0, '2025-05-06 22:31:14', '2025-05-06 22:31:14'),
(5, 1, 1, 'console.log()', 1, 0, '2025-05-06 22:33:11', '2025-05-06 22:33:11'),
(6, 3, 4, 'Reprehenderit sit e', 1, 0, '2025-05-07 07:00:11', '2025-05-07 07:00:11'),
(7, 1, 4, 'Nice', 1, 0, '2025-05-07 07:46:21', '2025-05-07 07:46:21'),
(8, 1, 4, 'This is Advertisement of xyz company', 1, 0, '2025-05-07 07:48:13', '2025-05-07 07:48:13'),
(9, 1, 4, 'This is Advertisement of xyz company', 1, 0, '2025-05-07 07:48:49', '2025-05-07 07:48:49'),
(10, 1, 4, 'quwgduygd2ygd', 1, 0, '2025-05-07 07:49:23', '2025-05-07 07:49:23'),
(11, 2, 4, 'This is The Advertiseing of xyz company', 1, 0, '2025-05-07 07:52:13', '2025-05-07 07:52:13'),
(12, 4, 1, 'Hello', 1, 0, '2025-05-07 10:50:52', '2025-05-07 10:50:52');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_followers`
--

CREATE TABLE `tbl_followers` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `follow_id` bigint(20) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_followers`
--

INSERT INTO `tbl_followers` (`id`, `user_id`, `follow_id`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(19, 1, 4, 1, 0, '2025-05-07 07:09:56', '2025-05-07 07:09:56'),
(20, 3, 1, 1, 0, '2025-05-07 09:32:18', '2025-05-07 09:32:18'),
(21, 4, 1, 1, 0, '2025-05-07 10:32:36', '2025-05-07 10:32:36'),
(22, 3, 4, 1, 0, '2025-05-07 11:44:50', '2025-05-07 11:44:50');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_likes`
--

CREATE TABLE `tbl_likes` (
  `id` bigint(20) NOT NULL,
  `post_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_likes`
--

INSERT INTO `tbl_likes` (`id`, `post_id`, `user_id`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(3, 1, 1, 1, 0, '2025-05-07 09:56:52', '2025-05-07 09:56:52'),
(4, 74, 1, 1, 0, '2025-05-07 10:42:46', '2025-05-07 10:42:46'),
(7, 1, 4, 1, 0, '2025-05-07 11:45:07', '2025-05-07 11:45:07');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_post`
--

CREATE TABLE `tbl_post` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `title` varchar(256) NOT NULL,
  `image` varchar(256) NOT NULL,
  `description` text NOT NULL,
  `total_likes` bigint(20) NOT NULL,
  `total_comments` bigint(20) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_post`
--

INSERT INTO `tbl_post` (`id`, `user_id`, `title`, `image`, `description`, `total_likes`, `total_comments`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 1, 'Reprehenderit simili', '1746548806748-43686887.jpg', 'Pariatur Dolor saep', 2, 9, 1, 0, '2025-05-06 16:26:46', '2025-05-06 16:26:46'),
(2, 1, 'Cupiditate dignissim', '1746549058583-aboutus2.jpg', 'Autem beatae ad fugi', 0, 1, 1, 0, '2025-05-06 16:30:58', '2025-05-06 16:30:58'),
(3, 4, 'Quibusdam eu veniam', '1746601184126-profile4.jpg', 'Commodi sit laborum', 0, 1, 1, 0, '2025-05-07 06:59:45', '2025-05-07 06:59:45'),
(4, 3, 'New Post', '1746614250864-bk2.jpg', 'qwertyuiosdfghjnm,lkyfghjkl', 0, 1, 1, 0, '2025-05-07 10:37:30', '2025-05-07 10:37:30');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id` bigint(20) NOT NULL,
  `username` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `name` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `bio` text NOT NULL,
  `avtar` varchar(256) DEFAULT NULL,
  `followers` bigint(20) NOT NULL,
  `following` bigint(20) NOT NULL,
  `privacy` enum('public','private','follower') NOT NULL DEFAULT 'public',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`id`, `username`, `email`, `name`, `password`, `bio`, `avtar`, `followers`, `following`, `privacy`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'sohail_exe', 'sohail@gmail.com', 'Shaikh Sohail', '$2b$10$7jLTr22spOEVhG7MFWLLyuI3lKeVKBJML5pKTUhIfOCIDn6K447YG', '💻 Developer | 🚀 Tech Enthusiast | 📸 Capturing Moments', '1746546334584-profile.png', 1, 2, 'follower', 1, 0, '2025-05-06 11:01:00', '2025-05-06 11:01:00'),
(2, 'adil_exe', 'adil@gmail.com', 'Adil Patel', '$2b$10$/mW8LA8l1gBGCrPAD8nw4eoQ0b9uIAbr4iW30jCqzu1mWhWFleSA6', '🔧 Backend Engineer | API Builder | Problem Solver\n\n💬 Passionate about building fast, scalable server-side apps using Node.js + Express.\n📦 Experienced with MongoDB, PostgreSQL, and REST APIs.\n☁️ Deploying on AWS | Vercel | Docker with CI/CD.', '1746559069083-profile2.jpg', 0, 0, 'public', 1, 0, '2025-05-06 19:17:49', '2025-05-06 19:17:49'),
(3, 'Rehan.java', 'rehan@gmail.com', 'Rehan Shaikh', '$2b$10$AMdtjGv.MwHWLqZsJ.p9eOETGpMmVD7x.czXOreeNxiqxWqukh5yq', ' Backend Specialist | OOP Enthusiast | Enterprise App Builder\n\n🔧 Proficient in Core Java, Spring Boot, Hibernate\n🧩 Building robust REST APIs and enterprise-grade apps\n🛡️ Focused on clean code, security, and performance\n🗃️ Familiar with MySQL, PostgreSQL, MongoDB', '1746559156820-profile3.jpg', 2, 0, 'public', 1, 0, '2025-05-06 19:19:16', '2025-05-06 19:19:16'),
(4, 'yasser_exe', 'yasser@gmail.com', 'Yasser Khalifa', '$2b$10$Sa/nFxXylsw1AxhU67WncOxVR.6Dc77wSUJ9I329PrYP/ISlxbd3q', ' Backend Specialist | OOP Enthusiast | Enterprise App Builder\n\n🔧 Proficient in Core Java, Spring Boot, Hibernate\n🧩 Building robust REST APIs and enterprise-grade apps\n🛡️ Focused on clean code, security, and performance\n🗃️ Familiar with MySQL, PostgreSQL, MongoDB', '1746559198601-profile4.jpg', 1, 2, 'public', 1, 0, '2025-05-06 19:19:58', '2025-05-06 19:19:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_comments`
--
ALTER TABLE `tbl_comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_followers`
--
ALTER TABLE `tbl_followers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_likes`
--
ALTER TABLE `tbl_likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_post`
--
ALTER TABLE `tbl_post`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_comments`
--
ALTER TABLE `tbl_comments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tbl_followers`
--
ALTER TABLE `tbl_followers`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `tbl_likes`
--
ALTER TABLE `tbl_likes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_post`
--
ALTER TABLE `tbl_post`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
