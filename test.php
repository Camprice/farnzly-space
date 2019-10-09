<?php

	// create connection
	$servername = "localhost";
	$username = "root";
	$dbname = "dnddb";
	$conn = new mysqli($servername, $username, "", $dbname);

	//check connection
	if(!$conn){
		die("Connection failed:" . mysqli_connect_error());
	};

	// creat sql query from form data and submit query
	$sql = "SELECT * FROM dnd5_spells WHERE spell_name LIKE '%{$_POST["spell_name"]}%'";
	if(!empty($_POST["school"])){
		$sql .= " AND (";
		$spellschools = $_POST["school"];
		$valueLength = count($spellschools);
		for ($x = 0; $x < $valueLength; $x++) {
			if ($x>0) {
				$sql.= " OR";
			};
			$sql .= " spell_type" . " LIKE" . " '%" . $spellschools[$x] . "%'";
		};
		$sql .= ")";
	};
	// echo $sql;
	$result = mysqli_query($conn, $sql);

	//construct result into a multidimensional array of associative arrays and ouputs result to browser
	$dnddb_data = array();
	if(mysqli_num_rows($result)>0){
		while($row = mysqli_fetch_assoc($result)){
			 $dnddb_data[] = $row;
		};
		echo json_encode($dnddb_data);
	}else{
		echo json_encode("No Results");
	};

	//close connection
	mysqli_close($conn);
	
?>