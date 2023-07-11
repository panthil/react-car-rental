-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2023 at 12:13 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `carrental`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `carid` varchar(500) DEFAULT NULL,
  `user_id` varchar(50) NOT NULL,
  `DateFrom` varchar(500) DEFAULT NULL,
  `DateTo` varchar(500) DEFAULT NULL,
  `FirstName` varchar(500) DEFAULT NULL,
  `LastName` varchar(500) DEFAULT NULL,
  `Email` varchar(500) DEFAULT NULL,
  `Number` varchar(500) DEFAULT NULL,
  `Carname` varchar(500) DEFAULT NULL,
  `price` varchar(500) DEFAULT NULL,
  `modal` varchar(500) DEFAULT NULL,
  `carImage` varchar(500) DEFAULT NULL,
  `razorpay_payment_id` varchar(500) DEFAULT NULL,
  `payment_status` varchar(500) NOT NULL DEFAULT 'Pending',
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `carid`, `user_id`, `DateFrom`, `DateTo`, `FirstName`, `LastName`, `Email`, `Number`, `Carname`, `price`, `modal`, `carImage`, `razorpay_payment_id`, `payment_status`, `created_at`) VALUES
(7, '11', '6', '2023-04-10', '2023-04-15', 'Customer', '1', 'customer1@gmail.com', '9630784512', 'verna', '11000', '2017', 'user_profiles/verna.jpg', 'pay_LbDvcOeDfCBPLM', 'Success', '2023-04-08 13:30:32');

-- --------------------------------------------------------

--
-- Table structure for table `car`
--

CREATE TABLE `car` (
  `id` int(11) NOT NULL,
  `name` varchar(500) DEFAULT NULL,
  `modal` varchar(500) DEFAULT NULL,
  `price` varchar(500) DEFAULT NULL,
  `category` varchar(500) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `status` varchar(500) NOT NULL DEFAULT 'Available',
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `car`
--

INSERT INTO `car` (`id`, `name`, `modal`, `price`, `category`, `image`, `status`, `created_at`) VALUES
(12, 'creta', '2018', '2500', 'Standard', 'user_profiles/creta.jpg', 'Available', '2023-03-28 18:25:46'),
(9, 'shift', '2016', '1500', 'Economy', 'user_profiles/swift.jpg', 'Available', '2023-03-28 18:19:39'),
(11, 'verna', '2017', '2200', 'Standard', 'user_profiles/verna.jpg', 'UnAvailable', '2023-03-28 18:23:48'),
(10, 'polo', '2015', '1200', 'Economy', 'user_profiles/polo.jpeg', 'Available', '2023-03-28 18:21:17'),
(13, 'audi Q7', '2015', '11000', 'Lux', 'user_profiles/q7.jpg', 'Available', '2023-03-28 18:28:30'),
(14, 'mercedes c class ', '2015', '15000', 'Lux', 'user_profiles/cclass.jpg', 'Available', '2023-03-28 18:30:19');

-- --------------------------------------------------------

--
-- Table structure for table `contactus`
--

CREATE TABLE `contactus` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `number` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `message` varchar(500) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `FirstName` varchar(500) DEFAULT NULL,
  `LastName` varchar(500) DEFAULT NULL,
  `Email` varchar(500) DEFAULT NULL,
  `DateOfBirth` varchar(500) DEFAULT NULL,
  `Gender` varchar(500) DEFAULT NULL,
  `Number` varchar(500) DEFAULT NULL,
  `Password` varchar(500) DEFAULT NULL,
  `Address` varchar(500) DEFAULT NULL,
  `admin` varchar(5) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `FirstName`, `LastName`, `Email`, `DateOfBirth`, `Gender`, `Number`, `Password`, `Address`, `admin`, `created_at`) VALUES
(1, 'Admin', NULL, 'admin@admin.com', '', '', '', '123456', '', '1', '2023-03-24 00:11:45'),
(6, 'Customer', '1', 'customer1@gmail.com', '1997-10-16', 'Male', '9630124578', '123456', 'Ambd', '0', '2023-04-08 13:27:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contactus`
--
ALTER TABLE `contactus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `car`
--
ALTER TABLE `car`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `contactus`
--
ALTER TABLE `contactus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
