<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model{

	protected $table = 'users'; //eloquate looks for the plural of the class name, you don't need to write this

	protected $fillable = [

		'name',
		'email',
		'password',
	];

	public function setPassword($password){

		$this->update([
				'password' => password_hash($password, PASSWORD_DEFAULT)
			]);

	}

}