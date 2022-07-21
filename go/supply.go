/*
SPDX-License-Identifier: Apache-2.0
*/

package main

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract provides functions for managing a car
type SmartContract struct {
	contractapi.Contract
}

type Index struct {
	Index int `json:"counter"`
}

type User struct {
	UserName  string `json:"UserName"`
	UserId    string `json:"UserId"`
	UserEmail string `json:"UserEmail"`
	UserRole  string `json:"UserRole"`
	Address   string `json:"Address"`
	Password  string `json:"Password"`
}

type Date struct {
	Factory     string `json:"Factory"`
	Wholesaler  string `json:"Wholesaler"`
	Distributor string `json:"Distributor"`
	Retailer    string `json:"Retailer"`
	Consumer    string `json:"Consumer"`
	Start       string `json:"Start"`
	Leave       string `json:"Leave"`
}

type Product struct {
	ProductId     string  `json:"ProductId"`
	OrderId       string  `json:"OrderId"`
	Name          string  `json:"Name"`
	ConsumerId    string  `json:"ConsumerId"`
	FactoryId     string  `json:"FactoryId"`
	RetailerId    string  `json:"RetailerId"`
	DistributorId string  `json:"DistributorId"`
	WholesalerId  string  `json:"WholesalerId"`
	Status        string  `json:"Status"`
	Date          Date    `json:"Date"`
	Price         float64 `json:"Price"`
}

type LoginResponse struct {
	UserName  string `json:"UserName"`
	UserId    string `json:"UserId"`
	UserEmail string `json:"UserEmail"`
	UserRole  string `json:"UserRole"`
	Address   string `json:"Address"`
}

type ProductQueryResult struct {
	Record *Product
}

type UserQueryResult struct {
	Record *User
}
type QueryAllResult struct {
	Record interface{}
}
type LoginResult struct {
	Data *User
}

func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	user := User{UserName: "admin", UserId: "admin", UserEmail: "begin270519@gmail.com", UserRole: "admin", Address: "Viet Nam", Password: "adminpw"}

	userAsBytes, errMashal := json.Marshal(user)

	if errMashal != nil {
		return fmt.Errorf("Marshal Error in user: %s", errMashal.Error())
	}

	err := ctx.GetStub().PutState(user.UserId, userAsBytes)

	if err != nil {
		return fmt.Errorf("Failed to create Entity. %s", user.UserId)
	}
	return nil
}

// key : CREATE_USER, args : UserName , UserId , UserEmail , UserRole , Address , Password.
// key : CREATE_PRODUCT, args : OrderId, Name, FactoryId, Status, Date (Factory), Price
func (s *SmartContract) Create(ctx contractapi.TransactionContextInterface, method string, userName string, userId string, userEmail string, userRole string, address string, password string, ProductId string, Name string, FactoryId string, Status string, Factory string, Price float64) interface{} {
	if method == "CREATE_USER" {
		user := User{UserName: userName, UserId: userId, UserEmail: userEmail, UserRole: userRole, Address: address, Password: password}
		userAsBytes, _ := json.Marshal(user)
		return ctx.GetStub().PutState(userId, userAsBytes)
	}
	if method == "CREATE_PRODUCT" {
		date := Date{Factory: Factory, Wholesaler: "", Distributor: "", Retailer: "", Consumer: "", Start: "", Leave: ""}
		product := Product{ProductId: ProductId, OrderId: "", Name: Name, ConsumerId: "", FactoryId: FactoryId, RetailerId: "", DistributorId: "", WholesalerId: "", Status: Status, Date: date, Price: Price}
		productAsBytes, _ := json.Marshal(product)
		return ctx.GetStub().PutState(ProductId, productAsBytes)
	}
	return nil
}

// key : LOGIN , args : userId, password
// key : GET_USER, args : userId
// key : GET_PRODUCT, args : product Id
func (s *SmartContract) Query(ctx contractapi.TransactionContextInterface, method string, userId string, password string, productId string) (interface{}, error) {
	if method == "LOGIN" {
		userAsBytes, err := ctx.GetStub().GetState(userId)

		if err != nil {
			return fmt.Errorf("Failed to read from world state. %s", err.Error()), nil
		}

		if userAsBytes == nil {
			return fmt.Errorf("%s does not exist", userId), nil
		}

		entityUser := User{}
		json.Unmarshal(userAsBytes, &entityUser)
		if entityUser.Password != password {
			return fmt.Errorf("Id or password is wrong"), nil
		}
		loginResult := LoginResult{Data: &entityUser} //clear
		return loginResult, nil                       //return entityUser
	}
	if method == "GET_USER" {
		userAsBytes, err := ctx.GetStub().GetState(userId)
		if err != nil {
			return fmt.Errorf("Failed : %s", err.Error()), nil
		}

		if userAsBytes == nil {
			return fmt.Errorf("%s UserId does not exist", userId), nil
		}

		user := new(User)
		_ = json.Unmarshal(userAsBytes, user)
		return user, nil

	}
	if method == "GET_PRODUCT" {
		productAsBytes, err := ctx.GetStub().GetState(productId)

		if err != nil {
			return fmt.Errorf("Failed : %s", err.Error()), nil
		}

		if productAsBytes == nil {
			return fmt.Errorf("%s ProductId does not exist", productId), nil
		}
		product := new(Product)
		_ = json.Unmarshal(productAsBytes, product)
		return product, nil
	}
	return nil, nil
}

// key : GET_ALL_PRODUCT with ID
// KEY : GET_ALL_USER with ID

func (s *SmartContract) QueryAll(ctx contractapi.TransactionContextInterface, key string) ([]QueryAllResult, error) {
	if key == "GET_ALL_PRODUCT" {
		startKey := ""
		endKey := ""

		resultsIterator, err := ctx.GetStub().GetStateByRange(startKey, endKey)

		if err != nil {
			return nil, err
		}
		defer resultsIterator.Close()

		results := []QueryAllResult{}

		for resultsIterator.HasNext() {
			queryResponse, err := resultsIterator.Next()

			if err != nil {
				return nil, err
			}

			product := new(Product)
			_ = json.Unmarshal(queryResponse.Value, product)

			queryResult := QueryAllResult{Record: product}
			results = append(results, queryResult)
		}

		return results, nil
	}
	if key == "GET_ALL_USER" {
		startKey := ""
		endKey := ""

		resultsIterator, err := ctx.GetStub().GetStateByRange(startKey, endKey)

		if err != nil {
			return nil, err
		}
		defer resultsIterator.Close()

		results := []QueryAllResult{}

		for resultsIterator.HasNext() {
			queryResponse, err := resultsIterator.Next()

			if err != nil {
				return nil, err
			}

			user := new(User)
			_ = json.Unmarshal(queryResponse.Value, user)

			queryResult := QueryAllResult{Record: user}
			results = append(results, queryResult)
		}

		return results, nil
	}
	return nil, nil

}

// send to Whosale : SEND_TO_WHOSALE, args : productId, userId, date.
// send to Distributor : SEND_TO_DISTRIBUTOR, args : productId, userId, date.
// send to Retailer : SEND_TO_RETAILER, args : productId, userId, date.
// sell to comsumer : SELL_TO_COMSUMER, args : productId, userId, date.
// order : ORDER, args : productId, orderId, date, comsumerID.
func (s *SmartContract) Change(ctx contractapi.TransactionContextInterface, method string, productId string, userId string, date string, comsumerId string) error {
	if method == "SEND_TO_WHOSALE" {
		productAsBytes, err := ctx.GetStub().GetState(productId)

		if err != nil {
			return fmt.Errorf("Failed . %s", err.Error())
		}

		if productAsBytes == nil {
			return fmt.Errorf("%s not exist", productId)
		}
		product := new(Product)
		_ = json.Unmarshal(productAsBytes, product)

		product.Date.Wholesaler = date
		product.WholesalerId = userId
		product.Status = "DELIVER"

		updateProductAsBytes, _ := json.Marshal(product)

		return ctx.GetStub().PutState(productId, updateProductAsBytes)

	}
	if method == "SEND_TO_DISTRIBUTOR" {
		productAsBytes, err := ctx.GetStub().GetState(productId)

		if err != nil {
			return fmt.Errorf("Failed . %s", err.Error())
		}

		if productAsBytes == nil {
			return fmt.Errorf("%s not exist", productId)
		}
		product := new(Product)
		_ = json.Unmarshal(productAsBytes, product)

		product.Date.Distributor = date
		product.DistributorId = userId
		product.Status = "DELIVER"
		product.Date.Leave = date

		updateProductAsBytes, _ := json.Marshal(product)

		return ctx.GetStub().PutState(productId, updateProductAsBytes)
	}
	if method == "SEND_TO_RETAILER" {
		productAsBytes, err := ctx.GetStub().GetState(productId)

		if err != nil {
			return fmt.Errorf("Failed . %s", err.Error())
		}

		if productAsBytes == nil {
			return fmt.Errorf("%s not exist", productId)
		}
		product := new(Product)
		_ = json.Unmarshal(productAsBytes, product)

		product.Date.Retailer = date
		product.RetailerId = userId
		product.Status = "DELIVER"

		updateProductAsBytes, _ := json.Marshal(product)

		return ctx.GetStub().PutState(productId, updateProductAsBytes)
	}
	if method == "SELL_TO_CONSUMER" {
		productAsBytes, err := ctx.GetStub().GetState(productId)

		if err != nil {
			return fmt.Errorf("Failed . %s", err.Error())
		}

		if productAsBytes == nil {
			return fmt.Errorf("%s not exist", productId)
		}
		product := new(Product)
		_ = json.Unmarshal(productAsBytes, product)

		product.Date.Consumer = date
		product.Status = "SOLD"

		updateProductAsBytes, _ := json.Marshal(product)

		return ctx.GetStub().PutState(productId, updateProductAsBytes)
	}
	if method == "ORDER" {
		productAsBytes, err := ctx.GetStub().GetState(productId)

		if err != nil {
			return fmt.Errorf("Failed . %s", err.Error())
		}

		if productAsBytes == nil {
			return fmt.Errorf("%s not exist", productId)
		}
		product := new(Product)
		_ = json.Unmarshal(productAsBytes, product)

		product.Date.Start = date
		product.OrderId = userId
		product.Status = "PREPARE"
		product.ConsumerId = comsumerId

		updateProductAsBytes, _ := json.Marshal(product)

		return ctx.GetStub().PutState(productId, updateProductAsBytes)
	}
	return nil
}

func main() {

	chaincode, err := contractapi.NewChaincode(new(SmartContract))

	if err != nil {
		fmt.Printf("Error create chaincode: %s", err.Error())
		return
	}

	if err := chaincode.Start(); err != nil {
		fmt.Printf("Error starting chaincode: %s", err.Error())
	}
}
