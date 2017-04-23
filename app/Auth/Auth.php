<?php

namespace App\Auth;

use App\Models\User;

class Auth
{
	public function user(){
		if (isset($_SESSION['user'])){ //added this code to disable sending empty session user object

		return User::find($_SESSION['user']);
		}

	}

	public function check(){

		return isset($_SESSION['user']);

	}

	public function attempt($email, $password){

		//grab the user by email
		$user = User::where('email', $email)->first();
		//if !user return false
		if(!$user){
			return false;
		}
		//verify password for that user
		if(password_verify($password, $user->password)){
			//set session
			$_SESSION['user'] = $user->id;
			return true;
		}
		return false;

	}

	public function logout (){

		unset($_SESSION['user']);
		
	}

}