package dto

import "golang.org/x/exp/constraints"

type IPricedItem interface {
	GetPrice() float64
	GetQuantity() int
}

type Number interface {
	constraints.Integer | constraints.Float
}
