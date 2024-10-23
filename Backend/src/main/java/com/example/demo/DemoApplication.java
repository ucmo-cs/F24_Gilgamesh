package com.example.demo;

import com.example.demo.dao.AccountDAO;
import com.example.demo.domain.Account;
import com.example.demo.entity.BankAccount;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
//used to indicate that a method instantiates, configures, and initializes a new object to be managed by the Spring IoC container
	public CommandLineRunner commandLineRunner (AccountDAO accountDAO){ //CommandLineRunner from the spring boot framework
		//executed after the spring beans have been loaded

		return runner ->{ //java lambda expression shorthand notation to create an implementation for runner
			//createAccount(accountDAO);

			//createMultipleAccounts(accountDAO);

			readAccount(accountDAO); //reads all Accounts

			//queryForAccounts(accountDAO); // looks for a Account by last name or can id its in DAOImpl

			//queryForAccountsByLastName(accountDAO);

			upDateAccount(accountDAO);

		};
	}

	private void upDateAccount(AccountDAO accountDAO) {

		//retrieve Account based on id: primary key
		int accountId = 1;
		System.out.println("Getting Account with id: " + accountId);
		BankAccount myBankAccount = accountDAO.findById(accountId);

		//change First name to "scooby"
		System.out.println("Updating Account...");
		myBankAccount.setFirstName("Paul");

		//update the Account
		accountDAO.update(myBankAccount);

		//display the Account
		System.out.println("Updated Account: " + myBankAccount);
	}

	private void queryForAccountsByLastName(AccountDAO accountDAO) {

		//get a list of Accounts
		List<BankAccount> theBankAccount = accountDAO.findByLastName("Duck"); //looking for this last name

		//display Accounts
		for (BankAccount tempBankAccount : theBankAccount){
			System.out.println(theBankAccount);
		}
	}

	private void queryForAccounts(AccountDAO accountDAO) {

		// get a list of Accounts
		List<BankAccount> theBankAccounts = accountDAO.findAll();

		//display list of Accounts
		for (BankAccount tempAccount : theBankAccounts){
			System.out.println(tempAccount);
		}

	}

	private void readAccount(AccountDAO accountDAO) {
		//create Account object
		System.out.println("Creating the Account...");
		BankAccount tempBankAccount = new BankAccount("Daffy", "Duck", "Daffy@luv2code.com",
				2347, 70000, 14.7);

		//save Account
		System.out.println("Saving Account...");
		accountDAO.save(tempBankAccount);

		//display id of the saved Account
		int theId = tempBankAccount.getId();
		System.out.println("Saved Account. Generating Id: " + theId);

		//retrieve Account base on the id:primary key
		System.out.println("Retrieving Account with id: " + theId);
		BankAccount myBankAccount = accountDAO.findById(theId);

		//display Account
		System.out.println("Found the Account: " + myBankAccount);
	}

	private void createMultipleAccounts(AccountDAO AccountDAO) {

		//create multiple Accounts
		System.out.println("Creating new Account object...");
		BankAccount tempAccount1 = new BankAccount("John", "Doe", "John@luv2code.com",
				3476, 49000, 17.9);
		BankAccount tempAccount2 = new BankAccount("Mary", "Doe", "Mary@luv2code.com",
				5698, 20000, 12.7);
		BankAccount tempAccount3 = new BankAccount("Bonita", "Doe", "Bonita@luv2code.com",
				6500, 56000, 16.8);
		//save Accounts
		System.out.println("Saving the Accounts...");
		AccountDAO.save(tempAccount1);
		AccountDAO.save(tempAccount2);
		AccountDAO.save(tempAccount3);

	}

	private void createAccount(AccountDAO AccountDAO) {
		//create a Account object
		System.out.println("Creating new Account object...");
		BankAccount tempBankAccount = new BankAccount("Paul", "Doe", "Pual@luv2code.com",
				3467, 39000, 13.9);

		//save the Account object
		System.out.println("Saving the Account...");
		AccountDAO.save(tempBankAccount);

		//display the id of the saved Account
		System.out.println("Saved Account. Generated id: " + tempBankAccount.getId());

	}

}
