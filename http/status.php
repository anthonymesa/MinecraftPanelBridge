<?php
	// Parse args
	$json_args = json_decode(file_get_contents("php://input"), TRUE);

	require('MulticraftAPI.php');
	$api = new MulticraftAPI($json_args['url'], $json_args['user'], $json_args['api_key']);

	$value = $api->getServerStatus($json_args['server_id'], true);
	
	print_r($value['data']['status']);
?>