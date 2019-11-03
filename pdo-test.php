<?php
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "dnddb";

	try{
		$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
		//set PDO error mode to exception
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		//build the prepared statment
		$sql = "SELECT * FROM dnd5_spells WHERE ";
		$parameters = [];
		
		if($_POST["classList"] != "all"){
			$sql .= "spell_id= ANY(SELECT spell_id FROM dnd5_class_spells WHERE class_id = ANY(SELECT class_id FROM dnd5_classes WHERE class_name= ?)) AND";
			$parameters[] = $_POST["classList"];
		};

		$sql .= " spell_name LIKE ?";
		$parameters[]= "%" . $_POST["spell_name"] . "%";

		if(!empty($_POST["school"])){
			$sql .= " AND (";
			$spellschools = $_POST["school"];
			$valueLength = count($spellschools);
			for ($x =0; $x < $valueLength; $x++){
				if ($x>0){
					$sql.= " OR";
				};
				$sql.= " spell_type LIKE ?";
				$parameters[] ="%" . $spellschools[$x] . "%";
			};
			$sql .= ")";
		};

		//bind the peramaters into the prepared statment
		$stmt = $conn->prepare($sql);
		$stmt->execute($parameters);
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

		//return result to browser
		if (count($result)>0){
			echo json_encode($result);
		}else{
			echo json_encode("No Results");
		}

	}catch(PDOException $e){
		echo "Error:" . $e->getMessage();
	};
	$conn = null
?>