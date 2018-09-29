  <?php
	//Use same config as bot
	require_once("config.php");
	
	// Establish mysql connection.
	$db = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASSWORD);

	// Error connecting to db.
	if ($db->connect_errno) {
		echo("Failed to connect to Database!\n");
		die("Connection Failed: " . $db->connect_error);
	}
                                                                                                                                                            
	$sql = "pokestop_name,lat,lon,address FROM pokestop";

	$result = $db->query($sql);
	
	if (!$result) {
		echo "An SQL error occured";
		exit;
	}
	
		$rows = array();
	while($pokestop = $result->fetch(PDO::FETCH_ASSOC)) {
	$pokestop = str_replace("\r", "", $pokestop);
    $pokestop = str_replace("\n", "", $pokestop);
		$rows[] = $pokestop;
	}
	
	print json_encode($rows);
	
	
?>
