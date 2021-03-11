<?php

$dsid = $_REQUEST['dsid'];
$token = $_REQUEST['token'];

// Connecting, selecting database
$dbconn = pg_connect("host=localhost dbname=discraft user=discraft_root password=VomirSet22108")
    or die('Could not connect: ' . pg_last_error());

$sql = "INSERT INTO payment_success VALUES ($1)";
$result = pg_prepare($dbconn, 'test', $sql);
$result = pg_execute($dbconn, 'test', array($dsid)) or die('Query failed: ' . pg_last_error());

// Free resultset
pg_free_result($result);

// Closing connection
pg_close($dbconn);

echo '<p>Server <b>' . $dsid . '</b> has paid! Please allow 5-10 minutes to process your request.</p>';

?>