package utils

import (
	"go.mongodb.org/mongo-driver/bson"
	"reflect"
)

func GenerateUpdateData(data interface{}) bson.M {
	updateData := bson.M{}
	v := reflect.ValueOf(data)
	typeOfData := v.Type()
	for i := 0; i < v.NumField(); i++ {
		field := v.Field(i)
		if !field.IsZero() {
			fieldName := typeOfData.Field(i).Tag.Get("bson")
			updateData[fieldName] = field.Interface()
		}
	}

	return updateData
}
