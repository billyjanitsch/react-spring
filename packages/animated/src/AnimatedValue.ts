import { is } from 'shared'
import { Animated } from './Animated'

/** An animated number or a native attribute value */
export class AnimatedValue<T = any> extends Animated {
  done!: boolean
  elapsedTime!: number
  lastPosition!: number
  lastVelocity!: number | null

  constructor(protected _value: T) {
    super()
    this.reset()
  }

  static create<T>(from: T, _to?: T | null) {
    return new AnimatedValue(from)
  }

  getPayload() {
    return [this] as const
  }

  getValue() {
    return this._value
  }

  setValue(value: T) {
    this._value = value
  }

  reset(isActive?: boolean, _goal?: T) {
    this.done = false
    if (is.num(this._value)) {
      this.elapsedTime = 0
      this.lastPosition = this._value
      if (!isActive) {
        this.lastVelocity = null
      }
    }
  }
}