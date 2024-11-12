package utils

import (
	"disabled-fpv-server/internal/dto"
	"fmt"
	"reflect"
)

func CalculateTotal[T any, V dto.Number](items []T, priceField, quantityField string) (V, error) {
	itemsValue := reflect.ValueOf(items)

	if itemsValue.Kind() != reflect.Slice {
		return 0, fmt.Errorf("items must be a slice")
	}

	var total V

	for i := 0; i < itemsValue.Len(); i++ {
		item := itemsValue.Index(i)

		if item.Kind() != reflect.Struct {
			return 0, fmt.Errorf("each item in the slice must be a struct")
		}

		priceValue := item.FieldByName(priceField)
		if !priceValue.IsValid() {
			return 0, fmt.Errorf("invalid price field: %s", priceField)
		}

		var price V
		switch priceValue.Kind() {
		case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
			price = V(priceValue.Int())
		case reflect.Float32, reflect.Float64:
			price = V(priceValue.Float())
		default:
			return 0, fmt.Errorf("price field must be a number, got %s", priceValue.Kind())
		}

		quantityValue := item.FieldByName(quantityField)
		if !quantityValue.IsValid() {
			return 0, fmt.Errorf("invalid quantity field: %s", quantityField)
		}

		var quantity V
		switch quantityValue.Kind() {
		case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
			quantity = V(quantityValue.Int())
		case reflect.Float32, reflect.Float64:
			quantity = V(quantityValue.Float())
		default:
			return 0, fmt.Errorf("quantity field must be a number, got %s", quantityValue.Kind())
		}

		total += price * quantity
	}

	return total, nil
}
