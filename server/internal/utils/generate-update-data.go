package utils

import (
	"go.mongodb.org/mongo-driver/bson"
	"log"
	"reflect"
)

func GenerateUpdateData(data interface{}) bson.M {
	updateData := bson.M{}

	v := reflect.ValueOf(data)
	if v.Kind() == reflect.Ptr {
		v = v.Elem()
	}

	if v.Kind() != reflect.Struct {
		panic("GenerateUpdateData: expected struct or pointer to struct")
	}

	typeOfData := v.Type()
	for i := 0; i < v.NumField(); i++ {
		field := v.Field(i)
		if !field.IsZero() {
			fieldName := typeOfData.Field(i).Tag.Get("bson")
			if fieldName != "" && fieldName != "-" {
				updateData[fieldName] = field.Interface()
			}
		}
	}
	log.Printf("updateData field: %s", updateData)
	return updateData
}
