<?php

	

	// remove next two lines for production
	
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);
	
	
	include("config.php");

	
	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = "Sorry, something went wrong";

		mysqli_close($conn);

		echo json_encode($output);

		exit;

	}	

	
    $query= $conn->prepare('SELECT albumName, artistName, year_release, ranking from albums where albumName=? ORDER BY albumName');
    $query->bind_param("s", $_POST['album']);
    $query->execute();
    $result = $query->get_result();
	
	if (false === $query) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = 'Sorry, something went wrong';

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}

	$data = [];
	//appends data to an associative array one row at a time
		while ($row = mysqli_fetch_assoc($result)) {
	
			array_push($data, $row);
	
		}
	
		$output['status']['code'] = "200";
		$output['status']['name'] = "ok";
		$output['status']['description'] = "success";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = $data;
		
		mysqli_close($conn);
	//echos the associative array
		echo json_encode($output); 

?>